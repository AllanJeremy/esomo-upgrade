<?php



require_once ("db_info.php");#Retrieving database information

#HANDLES SESSIONS, LOGIN INFORMATION AND OTHER SESSION INFO.
class MySessionHandler
{
/*----------------------------------------------------------------------------------------------------------*/
                                            /*ADMIN SECTION*/
/*----------------------------------------------------------------------------------------------------------*/
    //Initialize admin session variables soon as they login - return null if the admin account is not found 
    private static function AdminInitSession($username,$acc_type) #only callable from within the class
    {
        $admin_acc = DbInfo::GetAdminAccount($username,$acc_type);
        if (!isset($admin_acc))
        {
            return null;#end execution of this function here if the admin account could not be found
        }

        #If the admin account was successfully created, initialize the session variables
        $_SESSION["admin_staff_id"]= $admin_acc["staff_id"];
        $_SESSION["admin_first_name"]= $admin_acc["first_name"];
        $_SESSION["admin_last_name"]= $admin_acc["last_name"];
        $_SESSION["admin_username"]= $admin_acc["username"];
        $_SESSION["admin_email"]= $admin_acc["email"];
        $_SESSION["admin_phone"]= $admin_acc["phone"];
        $_SESSION["admin_account_type"]= $admin_acc["account_type"];
        $_SESSION["admin_password"]= $admin_acc["password"];

        return true;
    }

    //Logs the admin in - initializes all session variables
    public static function AdminLogin($username,$acc_type)
    {
        #Attempt to initialize session variables, if this fails, print the error message
        if(!self::AdminInitSession($username,$acc_type))
        {
            ErrorHandler::PrintError("Could not retrieve the admin account requested for use in the session handler.");
        }
    }


    //Logs the admin account off - deletes all session variables
    public static function AdminLogout()
    {
        unset(
            $_SESSION["admin_first_name"],
            $_SESSION["admin_last_name"],
            $_SESSION["admin_username"],
            $_SESSION["admin_email"],
            $_SESSION["admin_phone"],
            $_SESSION["admin_account_type"],
            $_SESSION["admin_password"]
        );
    }
    
    //Returns true if the admin is logged in and false if the admin is not logged in
    public static function AdminIsLoggedIn()
    {
        return 
        (
            isset(
                $_SESSION["admin_first_name"],
                $_SESSION["admin_last_name"],
                $_SESSION["admin_username"],
                $_SESSION["admin_email"],
                $_SESSION["admin_phone"],
                $_SESSION["admin_account_type"],
                $_SESSION["admin_password"]
            )
        );
    }


/*----------------------------------------------------------------------------------------------------------*/
                                            /*STUDENT SECTION*/
/*----------------------------------------------------------------------------------------------------------*/

    //Initialize student session variables soon as they login - return null if the student account is not found 
    private function StudentInitSession($username) #only callable from within the class
    {
        $student_acc = DbInfo::GetStudentAccount($username);
        if (!isset($student_acc))
        {
            return null;#end execution of this function here if the student account could not be found
        }

        #If the student account was successfully created, initialize the session variables
        $_SESSION["student_adm_no"] = $student_acc["adm_no"];
        $_SESSION["student_first_name"] = $student_acc["first_name"];
        $_SESSION["student_last_name"] = $student_acc["last_name"];
        $_SESSION["student_username"] = $student_acc["username"];
        $_SESSION["student_password"] = $student_acc["password"];
        $_SESSION["student_email"] = $student_acc["email"];
        $_SESSION["student_personal_phone"] = $student_acc["personal_phone"];
        $_SESSION["student_parent_name"] = $student_acc["parent_names"];
        $_SESSION["student_parent_phone"] = $student_acc["parent_phone"];
        $_SESSION["student_full_name"] = $student_acc["full_name"];
        $_SESSION["student_class_ids"] = $student_acc["class_ids"];

        return true;
    }

    //Logs the student in - initializes all session variables
    public static function StudentLogin($username)
    {
        #Attempt to initialize session variables, if this fails, print the error message
        if(!$this->StudentInitSession($username))
        {
            ErrorHandler::PrintError("Could not retrieve the student account requested for use in the session handler.");
        }

        
    }


    //Logs the student account off - deletes all session variables
    public static function StudentLogout()
    {
        unset(
            $_SESSION["student_adm_no"],
            $_SESSION["student_first_name"],
            $_SESSION["student_last_name"],
            $_SESSION["student_username"],
            $_SESSION["student_password"],
            $_SESSION["student_email"],
            $_SESSION["student_personal_phone"],
            $_SESSION["student_parent_name"],
            $_SESSION["student_parent_phone"],
            $_SESSION["student_full_name"],
            $_SESSION["student_class_ids"]
        );
    }
    
    //Returns true if the student is logged in and false if the admin is not logged in
    public static function StudentIsLoggedIn()
    {
        return
        (
            isset(
                $_SESSION["student_adm_no"],
                $_SESSION["student_first_name"],
                $_SESSION["student_last_name"],
                $_SESSION["student_username"],
                $_SESSION["student_password"],
                $_SESSION["student_email"],
                $_SESSION["student_personal_phone"],
                $_SESSION["student_parent_name"],
                $_SESSION["student_parent_phone"],
                $_SESSION["student_full_name"],
                $_SESSION["student_class_ids"]
            )
        );
    }

}