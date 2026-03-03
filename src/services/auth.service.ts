import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { organizationRepository } from "../repositories/organization.repository.js";
import { AppError } from "../errors/AppError.js";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authService = {
  login: async (email: string, password: string) => {
    const organization = await organizationRepository.findByEmail(email);

    if (!organization) {
      throw new AppError("Invalid credentials",401);
    }

    const isValid = await argon2.verify(organization.password_hash, password);

    if (!isValid) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      {
        systemId: organization.id,
        email: organization.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    return {
      message: "Login successful.",
      system: {
        id: organization.id,
        name: organization.name,
        email: organization.email,
      },
      token,
    };
  },
};
