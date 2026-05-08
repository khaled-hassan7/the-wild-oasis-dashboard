import supabase, { supabaseUrl } from "./supabase";

export async function signup({ password, email, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    password,
    email,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  console.log(data);

  return data;
}

export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function editCurrentUser({ fullName, avatar, password }) {
  // update name and password
  let updateData;

  if (fullName) updateData = { data: { fullName } };
  if (password) updateData = { password };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data;

  //upload avatar  avatar storge image
  const avatarNameFile = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storgeError } = await supabase.storage
    .from("avatars")
    .upload(avatarNameFile, avatar);

  if (storgeError) throw new Error(storgeError.message);

  // update avatar image

  const { data: editeUser, error: updateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarNameFile}`,
      },
    });

  if (updateError) throw new Error(updateError.message);
  console.log(updateData);
  return editeUser;
}
