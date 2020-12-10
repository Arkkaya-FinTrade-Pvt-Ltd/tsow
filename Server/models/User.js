const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  e_email: String,
});

mongoose.model('tsowUser', UserSchema);
/*
  //   type: String,
  //   //unique: true,
  //   //required: true,
  // },
});

*/
