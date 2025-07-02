export function validatePasswordForm(formData: FormData): {
  name: boolean;
  username: boolean;
  password: boolean;
} {
  const name = !!formData.get('name')?.toString().trim();
  const username = !!formData.get('username')?.toString().trim();
  const password = !!formData.get('password')?.toString().trim();

  return { name, username, password };
}
