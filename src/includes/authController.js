import pool from "./db.js";
import axios from "axios";

export const socialLogin = async (req, res) => {
  try {
    const { token, auth_provider } = req.body;

    if (!token || !auth_provider) {
      return res.status(400).json({ error: "Missing token or auth_provider" });
    }

    let first_name = "";
    let last_name = "";
    let email = "";
    let provider_id = "";

    if (auth_provider === "google") {
      const googleUserData = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${token}` } },
      );
      provider_id = googleUserData.data.sub;
      email = googleUserData.data.email;
      first_name = googleUserData.data.given_name || "";
      last_name = googleUserData.data.family_name || "";
    } else if (auth_provider === "facebook") {
      const fbUserData = await axios.get(
        `https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=${token}`,
      );
      provider_id = fbUserData.data.id;
      email = fbUserData.data.email || `${provider_id}@facebook.com`;
      first_name = fbUserData.data.first_name || "";
      last_name = fbUserData.data.last_name || "";
    } else {
      return res.status(400).json({ error: "Unsupported auth provider" });
    }

    if (!email) {
      return res
        .status(400)
        .json({ error: "Failed to retrieve email from provider" });
    }

    const userExistQuery = "SELECT * FROM users WHERE email = $1";
    const userExist = await pool.query(userExistQuery, [email]);

    let userToSession = null;

    if (userExist.rows.length > 0) {
      const existingUser = userExist.rows[0];

      if (existingUser.auth_provider !== auth_provider) {
        const updateProviderQuery = `
          UPDATE users 
          SET auth_provider = $1, provider_id = $2, first_name = $3, last_name = $4 
          WHERE email = $5 RETURNING *`;
        const updatedUser = await pool.query(updateProviderQuery, [
          auth_provider,
          provider_id,
          first_name || existingUser.first_name,
          last_name || existingUser.last_name,
          email,
        ]);

        userToSession = updatedUser.rows[0];
        console.log(
          `[LOGIN-PROVIDER-LINK] User switched to ${auth_provider}: ${email}`,
        );

        req.session.userId = userToSession.id;
        req.session.email = userToSession.email;
        req.session.role = userToSession.role;
        req.session.isLoggedIn = true;

        // 💡 FIXED: Isinama ang token at role sa root level
        return res.status(200).json({
          message: "Welcome back! Account linked.",
          token: token,
          role: userToSession.role,
          user: userToSession,
        });
      }

      userToSession = existingUser;
      console.log(`[LOGIN] User connected via ${auth_provider}: ${email}`);

      req.session.userId = userToSession.id;
      req.session.email = userToSession.email;
      req.session.role = userToSession.role;
      req.session.isLoggedIn = true;

      // 💡 FIXED: Isinama ang token at role sa root level
      return res.status(200).json({
        message: "Welcome back!",
        token: token,
        role: userToSession.role,
        user: userToSession,
      });
    }

    const insertUserQuery = `
      INSERT INTO users (first_name, last_name, email, auth_provider, provider_id) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    const newUser = await pool.query(insertUserQuery, [
      first_name,
      last_name,
      email,
      auth_provider,
      provider_id,
    ]);

    userToSession = newUser.rows[0];
    console.log(
      `[REGISTER] New account created via ${auth_provider}: ${email}`,
    );

    req.session.userId = userToSession.id;
    req.session.email = userToSession.email;
    req.session.role = userToSession.role;
    req.session.isLoggedIn = true;

    // 💡 FIXED: Isinama ang token at role sa root level
    return res.status(201).json({
      message: "Account created!",
      token: token,
      role: userToSession.role,
      user: userToSession,
    });
  } catch (error) {
    console.log("\n====== BACKEND ERROR DETECTED ======");
    console.error("MESSAGE:", error.message);
    console.log("====================================\n");

    if (!res.headersSent) {
      return res.status(500).json({ error: "Authentication failed" });
    }
  }
};
