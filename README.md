# Role-Based-Access-Control-Backend  
  
The goal is to create a robust  
application with user authentication, role-based access control, and secure API endpoints.  
Assignment Requirements  
**User Management:**  
***1. Signup -> (done)***   
 Collect basic details (email, phone number, name, profile image, password)  
during the signup process.  
 Ensure at least one of the phone number or email is provided during signup.  
 Implement encryption for passwords.  
***2. Login -> (done)***  
 Allow users to log in using email/phone and password.  
***3. Modify User Details -> (done)***  
 Users can only modify their own name and profile image.  
 Phone number and email, once entered, cannot be changed.***(will implement it soon)***  
***4. Delete User -> (done)***  
 Users should have the ability to delete their accounts.  
**Roles and Access Control:**  
***5. Roles -> (done)***  
 Define two roles: Admin and User.  
***6. Admin Access -> (done)***  
 Admins can view, modify, and delete all user details.  
***7. User Access -> (done)***  
 Users can only view, modify and delete their own details.  
**Admin Management:**  
***8. Create Admin -> (done)***  
 Create APIs to allow the creation of admin accounts.  
**Authentication and Security:**  
***9. Authentication -> (done)***  
 Implement an authentication system using JSON Web Tokens (JWT).  
***10.Password Encryption -> (done)***  
 Use bcrypt to securely encrypt user passwords.  
**Image Storage:**  
***11.Profile Image -> (Not done Yet, will complete soon)***  
 Save profile images in the local system or integrate with a third-party service.  
 Ensure that image URLs work, at least in the local environment.  
**Database and Framework:**  
***12.Framework -> (done)***  
 Utilize Express.js for API development.  
***13.Database -> (done)***  
 Choose between MongoDB or Firebase for the database.  
**Data Validation:**  
***14.Data Validation -> (Not done Yet,will complete soon)***  
 Implement thorough data validation to ensure the correctness and integrity of  
input data.  
