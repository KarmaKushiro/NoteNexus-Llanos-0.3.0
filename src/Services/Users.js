import Parse from 'parse';

// Initialize Parse with Server configuration
Parse.initialize('v85IhkmEecn13wAqIazQP3HrcTHQXCrUPdawcJ3x', 'nCam5b5IQh18sstWAa7v6XuAazYAqM7vUPgRmVYR', '07y5fpdYqUZtJ93svwALFKBpBSaT2gPcRMp7XwXR');
Parse.serverURL = 'https://parseapi.back4app.com/';

export const createUser = async (id, firstName, lastName, email, password) => {
  const User = new Parse.User();
  User.set('id', id);
  User.set('firstName', firstName);
  User.set('lastName', lastName);
  User.set('username', email); // set username as email for simplicity
  User.set('email', email);
  User.set('password', password);

  try {
    const result = await User.signUp();
    console.log('User created successfully:', result);
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  const query = new Parse.Query(Parse.User);
  try {
    const users = await query.find();
    console.log('Users retrieved successfully:', users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};