// Stub for airo-secrets module
export const secrets = {};

export async function getSecret(name: string): Promise<string | undefined> {
  // Stub implementation - returns environment variable if available
  return process.env[name];
}

export default secrets;
