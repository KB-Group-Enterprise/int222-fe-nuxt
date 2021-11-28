export default function ({ $auth, redirect }) {
  const user = $auth.user;
  if (user && user.role.roleName !== 'admin') {
    redirect('/');
  }
}
