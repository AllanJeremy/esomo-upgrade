<?php

/*THIS CLASS IS USED TO HANDLE ALL UPLOAD FUNCTIONALITY*/
class EsomoUploader
{
    /*CONSTANTS*/
    //Upload Constants
    public static $base_upload_dir;
    public static $resource_upload_dir;
    public static $ass_upload_dir;
    public static $ass_submission_upload_dir;
    public static $other_upload_dir;
    
    const DEFAULT_MAX_UPLOAD_SIZE = 50;#Default upload size in megabytes
    const DEFAULT_ACCEPTED_FILE_TYPES = "pdf,jpeg,jpg,png,word,docx,";

    /*VARIABLES*/
    public $files_found;
    public $max_file_size;
    public $accepted_file_types;
    public $can_upload;
    public $file_exists;#boolean ~ true if the file exists and false if the file does not exist

    //Constructor
    function __construct()
    {   
        //Directory init
        self::$base_upload_dir = realpath(dirname(__FILE__)."/../uploads");
        self::$resource_upload_dir = self::$base_upload_dir ."/resources/";
        self::$ass_upload_dir = self::$base_upload_dir ."/assignments/";
        self::$ass_submission_upload_dir = self::$base_upload_dir ."/ass_submissions/";
        self::$other_upload_dir = self::$base_upload_dir ."/other/";

        //Variable Initialization
        $this->max_file_size = self::DEFAULT_MAX_UPLOAD_SIZE;#default maximum upload size in megabytes
        $this->accepted_file_types = self::DEFAULT_ACCEPTED_FILE_TYPES; #default accepted file types
        $this->can_upload = false;#can upload file, default is false

        $the_file = &$_FILES;
        $this->files_found = null;
        echo 'A dump from the constructor';
        $this->file_exists = (isset($the_file) && (!empty($the_file)));#Check if the file name is set in the files section
        if($this->file_exists)
        {
            $this->files_found = $the_file;
        }
    }

    //Determine Upload directory based on what upload type it is ~ returns it | TODO: add error handling
    private static function GetUploadFolder($upload_type)
    {
        $upload_folder=null;
        switch($upload_type)
        {
            case "resource": #resource upload
                $upload_folder = self::$resource_upload_dir;
            break;
            
            case "assignment": #assignment upload
                $upload_folder = self::$ass_upload_dir;
            break;
            
            case "ass_submission": #assignment submission upload
                $upload_folder = self::$ass_submission_upload_dir;
            break;

            default: #uncategorized item upload
                $upload_folder = self::$other_upload_dir;
        }
        // $upload_folder = realpath($upload_folder);
        //Check if the directory exists, if it does not exist, create it
        if(!file_exists($upload_folder))
        {
            #Create the folder
            mkdir($upload_folder);
        }
        return $upload_folder;
    }
    
    //Checks if 
    //Checks if a file is within the valid size range ~ returns true if it is, and false if not
    private static function FileSizeIsValid($source_path)
    {
        //Check if the file size is valid
        return true;
    }

    //Checks if a file is of an accepted file type ~ returns true if it is, and false if not
    private static function FileTypeIsValid($source_path)
    {
        //Check if the file type is valid
        return true;
    }

    //Checks if a file's name is valid ~ returns true if it is, and false if not
    private static function FileNameIsValid($source_path)
    {   
        //Check if the file name is valid
        return true;
    }

    //Upload file function
    public function UploadFile($upload_type)
    {   
        $source_path = &$this->file_info["file_path"]; #Path to the local source file to be uploaded
        $upload_path = self::GetUploadFolder($upload_type); #Path the file will be uploaded to
        $file_size_valid = self::FileSizeIsValid($source_path); #Boolean indicating if the file(to be uploaded) size is valid
        $file_type_valid = self::FileTypeIsValid($source_path); #Boolean indicating if the file(to be uploaded) type is valid
        $file_name_valid = self::FileNameIsValid($source_path); #Boolean indicating if the file(to be uploaded) name is valid
        $folder_exists = is_dir($upload_path);
        
        echo "<br><br><br>";
        
        $this->can_upload = ($file_size_valid && $file_type_valid && $file_name_valid && $folder_exists);

        //Upload file here
        if($this->can_upload)
        {
            $files_found = $this->files_found;

            foreach($files_found as $file)
            {
                echo 'this far';
                $file_name = &$file["name"];
                $tmp_name = &$file["tmp_name"];
                
                $file_size = &$file["size"];
                
                $upload_destination = $upload_path . $file_name ;
                if(move_uploaded_file($tmp_name,$upload_destination))
                {
                    echo "Succeeded uploading <b>".$file_size." bytes</b> of the file <b>".$file_name."</b>";
                }
                else
                {
                    echo "Failed to upload <b> the file : ".$file_name."</b>";
                }
            }
            unset($_FILES);
        }
        else #cannot upload file
        {
            return false;
        }
    }

};

