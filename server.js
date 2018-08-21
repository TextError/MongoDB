const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

//-------------------------------------------

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//-------------------------------------------

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport);

//-------------------------------------------

//Create routes to the files
const users = require('./routes/api/users/users');
const profile = require('./routes/api/profile/profile');
const posts = require('./routes/api/posts/posts');


const user_register = require('./routes/api/users/user_registration');
const user_login = require('./routes/api/users/user_login');

const create_profile = require('./routes/api/profile/create_profile');
const profile_handle = require('./routes/api/profile/profile_handle');
const profile_id = require('./routes/api/profile/profile_id');
const profile_all = require('./routes/api/profile/profile_all');
const profile_experience = require('./routes/api/profile/profile_experience');
const profile_education = require('./routes/api/profile/profile_education');
const experience_delete = require('./routes/api/profile/experience_delete');
const education_delete = require('./routes/api/profile/education_delete');
const profile_delete = require('./routes/api/profile/profile_delete');

const create_post = require('./routes/api/posts/create_post');
const find_post = require('./routes/api/posts/find_post');
const delete_post = require('./routes/api/posts/delete_post');
const like_post= require('./routes/api/posts/like_post');
const unlike_post = require('./routes/api/posts/unlike_post');
const comment_post = require('./routes/api/posts/comment_post');
const delete_comment_post = require('./routes/api/posts/delete_comment_post');

//-------------------------------------------

//User routes
app.use('/api/users', users, user_login, user_register);
app.use('/api/profile', profile, create_profile, profile_handle, profile_id, profile_all,profile_experience,profile_education,experience_delete,education_delete,profile_delete);
app.use('/api/posts', posts, create_post, find_post, delete_post, like_post, unlike_post, comment_post, delete_comment_post);

//-------------------------------------------

//DB Config
const db = require('./config/keys').mongoURI;
//connect to MongoDB via mongoose
mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

//-------------------------------------------

//Port
const port = process.env.Port || 5000;
//Testing if works
app.get('/', (req, res) => res.send('Hello'));
app.listen(port, () => console.log(`Server running on port: ${port}`));