<?php

require_once (realpath(dirname(__FILE__) . "/../handlers/db_handler.php")); #Allows connection to database
require_once (realpath(dirname(__FILE__) . "/../classes/timer.php")); #Allows connection to database

#HANDLES TEST RELATED FUNCTIONS
class Test
{
    //Constants. One for checked and one for hide.
    #Using constants so that if the classes being used to control if a radio button is checked and hide change we only need to change them herhe
    const CHECKED = "checked";
    const HIDE = "hide";

    //Constructor
    function __construct()
    {
        
    }

    //Display test instructions. Instructions seen just before opening the Test
    public static function DisplayTestInstructions($test)
    {
?>
    <br>
    <div class="container row">

        <!--Test details-->
        <div class="col s12 m6 l3"><h5 class="grey-text text-darken-3">Subject : <small class="grey-text text-darken-2"><?php echo (DbInfo::GetSubjectById($test["subject_id"]))["subject_name"];?></small></h5></div>

        <div class="col s12 m6 l3"><h5 class="grey-text text-darken-3">Difficulty : <small class="grey-text text-darken-2"><?php echo $test["difficulty"];?></small></h5></div>

        <div class="col s12 m6 l3"><h5 class="grey-text text-darken-3">Max Grade : <small class="grey-text text-darken-2"><?php echo $test["max_grade"];?></small></h5></div>

        <div class="col s12 m6 l3"><h5 class="grey-text text-darken-3">Passing Grade : <small class="grey-text text-darken-2"><?php echo $test["passing_grade"];?></small></h5></div>

        <div class="col s12 divider"></div>

        <!--Test Description-->
        <div class="col s12">
            <br><h4>Instructions</h4>
            <p><?php echo $test["test_description"];?></p>
        </div>

        <!--Test Instructions-->
        <div class="col s12">
            <br><h4>Description</h4>
            <p>This test has about <?php echo $test["number_of_questions"];?> multiple choice questions and should take less than <?php echo $test["time_to_complete"];?> minutes to complete. Click start test when you're ready to begin. </p>
        </div>

        <div class="col s12">
            <br>
            <?php $url_extension = "tests.php?tid=".$test["test_id"]."&edit=".$test["editable"]."&q=";?>
            <a data-redirect-url="<?php echo $url_extension.'1'; ?>" class="btn btn-large" id="start_test">START TEST</a>
        </div>

    </div>
<?php
    }
    //Displays a test, inclusive of all questions
    public static function DisplayTest($test,$question_index)
    {
        $user_info = MySessionHandler::GetLoggedUserInfo();

        //Find the question in the database
        if($question = DbInfo::TestQuestionExists($test["test_id"],$question_index)):
            $timer_info = EsomoTimer::GetTestTimerInfo($test,$user_info);

?>
    <div class="row grey darken-2 z-depth-1">
        <div class="container">
            <div class="row no-margin">
                <div class="col s6 m4 center-align">
                    <p class="white-text">Question <span class="php-data"><?php echo $question_index; ?></span> of <?php echo $test["number_of_questions"]; ?></p>
                </div>
                <div class="col s6 m4 right pull-s1">
                    <p class="white-text valign">Time Left : <span class="<?php echo $timer_info['timer_class'];?>"><?php echo $timer_info['timer_text'];?></span></p>
                </div>
            </div>
        </div>
    </div>
    <div class="row my-container">
                <h4 class="col s12 grey-text thin text-darken-4 question-number">Question <?php echo $question_index." ( ".$question["marks_attainable"]." Marks)"; ?></h4>
                <br>
                <h5 class="question light black-text">
                    <?php echo $question["question_text"];?>
                </h5>
                <br>

                <div class="col s12">
                    <form action="#" class="row">
                        <?php
                            //Get the question type
                            $input_type = "radio";
                            $is_last_question = false;

                            if($question_index == $test["number_of_questions"])
                            {
                                $is_last_question = true;
                            }

                            //Find the question type so that we can display the appropriate options
                            switch($question["question_type"])
                            {
                                case "single_choice":#if the question is a single choice question
                                    $input_type = "radio";
                                break;

                                case "multiple_choice":
                                    $input_type = "checkbox";
                                break;

                                default:
                                    echo "<p>Unknown question type</p>";
                            }

                            //Get the question answers
                            if($answers = DbInfo::GetQuestionAnswers($question["question_id"])):
                                #Id of the test answer is the answer_index in the database
                                foreach($answers as $answer):
                        ?>
                        <p>
                            <input class="t_test_answer" name="test_answer" type="<?php echo $input_type?>" id="<?php echo $answer['answer_index']?>" />
                            <label for="<?php echo $answer['answer_index']?>"><?php echo $answer["answer_text"]; ?></label>
                        </p>

                        <?php
                                endforeach;#Answers loop
                            else:#Answers not found in the database
                        ?>
                        <h4 class="question light black-text">Error : Answers for the question could not be found</h4>
                        <?php
                            endif;#if checking for whether answers for the question exist
                        ?>
                        <br>

                        <?php
                            $url_extension = "tests.php?tid=".$test["test_id"]."&q=";
                            if(!$is_last_question):
                                $next_que_url = $url_extension.($question_index+1);
                        ?>
                        <!--Progress buttons-->
                        <div class="col s6 input-field">
                            <a class="btn-flat btn-skip-question center taker_next_url" id="t_skip_que" data-redirect-url="<?php echo $next_que_url;?>">skip</a>
                        </div>
                        <div class="col s6 input-field">
                            <a class="btn right taker_next_url" id="t_next_que" data-redirect-url="<?php echo $next_que_url;?>"><span class="hidden-on-small-only">Next Question</span><i class="material-icons hide-on-med-and-up">arrow_forward</i></a>
                        </div>
                        <?php
                            else:
                        ?>
                        <div class="col s6 input-field">
                            <a class="btn-flat btn-skip-question center" type="submit">skipped questions</a>
                        </div>
                        <div class="col s6 input-field">
                            <a class="btn right" id="t_complete_test" data-redirect-url="tests.php?complete_test=1"><span class="hidden-on-small-only">Complete Test</span><i class="material-icons hide-on-med-and-up">arrow_forward</i></a>
                        </div>
                        <?php
                            endif;
                        ?>

                    </form>
                </div>
            </div>
<?php
    else://If the question exists in the database
?>
 <div class="row my-container">
    <h4 class="col s12 grey-text thin text-darken-4 question-number">Oops, we could not find that question :(</h4>
    <p class="flow-text">A common reason for this is that the test is incomplete. We recommend that you report the missing question so that it can be fixed.</p>
    <br>
    <a class="btn flat" href="javascript:void(0)">Report Missing question</a>
 </div>
<?php
    endif;
    }

    //Displays a question, depending on whether the question exists in the database or not
    public static function DisplayEditQuestion($test,$question_index)#question_id is the question index
    {
        //Default variables for questions
        $question_type = "single_choice";
        $test_id = htmlspecialchars($test["test_id"]);
        $q_id = "t".$test_id."q".$question_index;#unique question id

        //Url extension for redirecting
        $url_extension = "tests.php?tid=".$test_id."&edit=".$test["editable"]."&q=";
        $question_count = $test["number_of_questions"];

        $is_last_question = ($question_index == $question_count);
        $is_first_question = ($question_index == 1);

        ?>
            <!--Test SubTitle section-->
            <div class="row grey darken-2 z-depth-1">
                <div class="container">
                    <div class="row no-margin">
                        <div class="col s10 m4 center-align">
                            <p class="white-text">Question <span class="php-data"><?php echo $question_index; ?></span> of <?php echo $test["number_of_questions"]; ?></p>
                        </div>

                        <div class="col s2 m2 right pull-s1">
                            <span><a class="btn" id="save_question" href="javascript:void(0)" style="margin-top:0.45em"><i class="material-icons">save</i></a></span>
                        </div>

                        <div class="col s12 m4 center-align">
                            <?php
                                //Marks for everything except the current question
                                $marks_allocated =  DbHandler::GetMarksUsed($test,$question_index);
                            ?>
                            <p class="white-text">Marks Allocated : <span id="txt_marks_allocated"><?php echo $marks_allocated;?></span>  / <span id="test_max_grade"><?php echo $test["max_grade"]; ?></span></p>
                        </div>
                    </div>
                </div>
            </div>

            <!--Test creation - editing section-->
            <div class="row">
                <div class="container">
                    <p class="grey-text">Question Info | Tip : Select the answer(s) to the question by selecting in your question options </p>
                    <div class="divider"></div><br>

            <?php
                $question_text = "";
                $marks_attainable = 5;#default marks attainable per question is 5

                //If the selected question is a single choice or multiple choice question when the page loads
                $is_single_choice = true;
                $is_multiple_choice = false;

                //Single and multiple choice selected states and visibility
                $single_choice_selected=self::CHECKED;
                $single_choice_visibility="";

                $multiple_choice_selected="";
                $multiple_choice_visibility=self::HIDE;#controls the visibility of the single/multiple choice

                //If the question has answers ~ by default is false unless answers are found later on
                $has_answers = false;
                $answers_found = null;#semi-global variable for storing the answers that are found

                //Default number of choices used when  a question is found in the database
                $no_of_choices = 3;#should only be used once we have found answers ~ this value will be updated then

                //Boolean ~ returns true if the question is in the database
                $question_is_in_database = false;#convenience for controlling whether we insert or update records into the db

                #if the question exists in the database ~ try and get the answers
                if($question_found = DbInfo::TestQuestionExists($test_id,$question_index))
                {
                    $question_is_in_database = true;#question was found in the database hence it is now true

                    $question_text = $question_found["question_text"];#set the placeholder to be equal to the question
                    $marks_attainable = $question_found["marks_attainable"];#update the marks attainable to match what's in the database

                    //Check what type the question found was
                    switch($question_found["question_type"])
                    {
                        case "single_choice":
                           $is_single_choice = true;
                           $is_multiple_choice = false;

                           $single_choice_selected = self::CHECKED;#make the single choice selection radio button checked
                           $multiple_choice_selected = "";#uncheck the multiple choice selection radio button

                           $single_choice_visibility="";#make single choices visible
                           $multiple_choice_visibility=self::HIDE;#hide multiple choices
                        break;

                        case "multiple_choice":
                           $is_multiple_choice = true;
                           $is_single_choice = false;

                            $multiple_choice_selected = self::CHECKED;#make the multiple choice selection radio button checked
                            $single_choice_selected = "";#uncheck the single choice selection radio button

                            $multiple_choice_visibility = "";#make multiple choices visible
                            $single_choice_visibility=self::HIDE;#hide single choices
                        break;

                        default:#unrecognized question type. Assume single choice
                           $is_single_choice = true;
                           $is_multiple_choice = false;

                           $single_choice_selected = self::CHECKED;#make the single choice selection radio button checked
                           $multiple_choice_selected = "";#uncheck the multiple choice selection radio button

                           $single_choice_visibility="";#make single choices visible
                           $multiple_choice_visibility=self::HIDE;#hide multiple choices

                    }

                    //Try getting the answers to the question ~
                    if($question_answers = DbInfo::GetQuestionAnswers($question_found["question_id"]))
                    {
                        $has_answers = true;
                        $answers_found = $question_answers;
                        $no_of_choices = $question_answers->num_rows;#update the number of choices to be the number of answers found for the question
                    }
                }
            ?>
                    <div class="row">
                        <div class="col s12">
                            <label for="test_question">Question</label>
                            <textarea class="materialize-textarea" id="test_question" placeholder="Enter question here"><?php echo $question_text; ?></textarea>
                        </div>
                    </div>

                    <!--Question type-->
                    <p class="grey-text text-darken-2">Question type</p>
                    <div class="row">
                        <div class="col s12 m4">
                            <input name="test_question_type" type="radio" id="test_qtype_single" class="test_q_type" value="single_choice" <?php echo $single_choice_selected; ?> data-toggle-qid="<?php echo $q_id;?>"/>
                            <label for="test_qtype_single">Single Choice Question</label>
                        </div>
                        <div class="col s12 m4">
                            <input name="test_question_type" type="radio" id="test_qtype_multiple" class="test_q_type"  value="multiple_choice" <?php echo $multiple_choice_selected; ?> data-toggle-qid="<?php echo $q_id;?>"/>
                            <label for="test_qtype_multiple">Multiple Choice Question</label>
                        </div>

                    </div>
                    <div class="divider"></div>

                    <br><br>

                    <!--Single choice question-->
                    <div class="row single_choice_question <?php echo $single_choice_visibility;?>" data-qid="<?php echo $q_id;?>">
                        <p class="grey-text text-darken-2">Single choice Question</p>
                        <div class="divider col s12"></div><br>
                        <!--Default settings for the question-->
                        <div class="col s12 m6">
                            <label for="single_choices_count">Number of choices</label>
                            <input type="number" value="<?php echo $no_of_choices;?>" min="1" max="8" id="single_choices_count" class="option_count" required/>
                        </div>
                        <div class="col s12 m6">
                            <label for="s_question_marks">Marks attainable</label>
                            <input type="number" value="<?php echo $marks_attainable;?>" min="1" max="20" class="question_marks" id="s_question_marks" required/>
                        </div>

                        <p class="grey-text text-darken-2">Options</p>
                        <div class="divider col s12"></div><br>

                        <!--Options-->
                        <div class=" col s12 s_que_answer_container">
                            <?php
                                //If the question is a single choice question that has answers and we managed to find the answers
                                if($has_answers && $answers_found):
                                    $ans_count = 0;
                                    foreach($answers_found as $answer):
                                        $ans_count += 1;#increase the answer count every time

                                        $checked_state="";#by default it is not checked
                                        if($answer["right_answer"])#if it is the right answer
                                        {
                                            $checked_state = "checked";#have it checked
                                        }
                            ?>
                            <div class="test_answer_container" data-ans-index="<?php echo $ans_count;?>">
                                <input type="radio" name="s_option_group" id="s_option_<?php echo $ans_count;?>" class="valign" <?php echo $checked_state?>>
                                <label for="s_option_<?php echo $ans_count;?>" class="test_answer_label"><?php echo $answer['answer_text'];?></label>
                                <input placeholder="<?php echo $answer['answer_text'];?>" class="test_answer" value="<?php echo $answer['answer_text'];?>">
                            </div>
                            <?php
                                    endforeach;
                                else:#no answers were found, default behaviour
                            ?>

                            <!--If answers for the question were not found-->
                            <div class="test_answer_container" data-ans-index="1">
                                <input type="radio" name="s_option_group" id="s_option_1" class="valign" checked>
                                <label for="s_option_1" class="test_answer_label">Option 1</label>
                                <input placeholder="Option 1" class="test_answer">
                            </div>

                            <div class="test_answer_container" data-ans-index="2">
                                <input type="radio" name="s_option_group" id="s_option_2" class="valign">
                                <label for="s_option_2" class="test_answer_label">Option 2</label>
                                <input placeholder="Option 2" class="test_answer">
                            </div>

                            <div class="test_answer_container" data-ans-index="3">
                                <input type="radio" name="s_option_group" id="s_option_3" class="valign">
                                <label for="s_option_3" class="test_answer_label">Option 3</label>
                                <input placeholder="Option 3" class="test_answer">
                            </div>
                            <?php
                                endif;#end if (checking if answers were found)
                            ?>
                        </div>
                    </div>

                    <!--Multiple choice question-->
                    <div class="row multiple_choice_question <?php echo $multiple_choice_visibility;?>" data-qid="<?php echo $q_id;?>">
                        <p class="grey-text text-darken-2">Multiple choice Question</p>
                        <div class="divider col s12"></div><br>

                        <!--Default single choice options-->
                        <div class="col s12 m6">
                            <label for="multiple_choices_count">Number of choices</label>
                            <input type="number" value="<?php echo $no_of_choices;?>" min="1" max="8" id="multiple_choices_count" class="option_count" required/>
                        </div>
                        <div class="col s12 m6">
                            <label for="m_question_marks">Marks attainable</label>
                            <input type="number" value="<?php echo $marks_attainable;?>" min="1" max="20" class="question_marks" id="m_question_marks" required/>
                        </div>


                        <p class="grey-text text-darken-2">Options</p>
                        <div class="divider col s12"></div><br>

                        <!--Options-->
                        <div class="col s12 m_que_answer_container">
                            <?php
                                //If the question is a single choice question that has answers and we managed to find the answers
                                if($has_answers && $answers_found):
                                    $ans_count = 0;
                                    foreach($answers_found as $answer):
                                        $ans_count += 1;#increase the answer count every time

                                        $checked_state="";#by default it is not checked
                                        if($answer["right_answer"])#if it is the right answer
                                        {
                                            $checked_state = "checked";#have it checked
                                        }

                            ?>
                            <div class="test_answer_container" data-ans-index="<?php echo $ans_count;?>">
                                <input type="checkbox" name="m_option_group" id="m_option_<?php echo $ans_count;?>" class="valign" <?php echo $checked_state?>>
                                <label for="m_option_<?php echo $ans_count;?>" class="test_answer_label"><?php echo $answer['answer_text'];?></label>
                                <input placeholder="<?php echo $answer['answer_text'];?>" class="test_answer" value="<?php echo $answer['answer_text'];?>">
                            </div>

                            <?php
                                    endforeach;
                                else:#no answers were found, default behaviour
                            ?>

                            <!--Default multiple choice options-->
                            <div class="test_answer_container" data-ans-index="1">
                                <input type="checkbox" name="m_option_group" id="m_option_1" class="valign" checked>
                                <label for="m_option_1" class="test_answer_label">Option 1</label>
                                <input placeholder="Option 1" class="test_answer">
                            </div>

                            <div class="test_answer_container" data-ans-index="2">
                                <input type="checkbox" name="m_option_group" id="m_option_2" class="valign">
                                <label for="m_option_2" class="test_answer_label">Option 2</label>
                                <input placeholder="Option 2" class="test_answer">
                            </div>

                            <div class="test_answer_container" data-ans-index="3">
                                <input type="checkbox" name="m_option_group" id="m_option_3" class="valign">
                                <label for="m_option_3" class="test_answer_label">Option 3</label>
                                <input placeholder="Option 3" class="test_answer">
                            </div>
                            <?php
                                endif;#end if (checking if answers were found)
                            ?>
                        </div>
                    </div>

                    <!--Next and previous buttons-->
                    <div class="row">
                    <?php
                        if(!$is_first_question):#if it is not the first question, display the previous question button
                            $prev_que_url = $url_extension . ($question_index-1);
                    ?>
                        <div class="col s4 left">
                            <a class="btn" id="prev_question" data-redirect-url="<?php echo $prev_que_url;?>">
                                <i class="material-icons hide-on-large-only">arrow_back</i>
                                <span class="hide-on-med-and-down">PREVIOUS QUESTION</span>
                                </a>
                        </div>
                    <?php
                        endif;
                        if(!$is_last_question):#if it is not the last question
                            $next_que_url = $url_extension . ($question_index+1);
                    ?>
                        <div class="col s4 right">
                            <a class="btn right" id="next_question"  data-redirect-url="<?php echo $next_que_url;?>">
                                <i class="material-icons hide-on-large-only">arrow_forward
</i>
                                <span class="hide-on-med-and-down">NEXT QUESTION</span>
                                </a>
                        </div>
                    <?php
                        else:#if the last question
                    ?>
                        <div class="col s4 right" id="completeTest">
                            <a class="btn right" href="javascript:void(0)" id="complete_test" data-redirect-url="tests.php?complete=1">
                                COMPLETE<span class="hide-on-med-and-down"> TEST</span>
                            </a>
                        </div>
                    <?php
                        endif;
                    ?>
                    </div>
                </div>
            </div>
        <?php
    }#end of  DisplayEditQuestion

    //Display wait until you can retake Test
    public static function DisplayWaitRetakeMessage($retake_info)
    {
        $retake_date = EsomoDate::GetOptimalDateTime($retake_info["retake_date"]);

?>
    <div class="container center">
        <br><br><br><br>
        <h5 class="grey-text text-darken-1">You need to wait before you can retake this test</h5>
        <h5 class="grey-text">The soonest you can retake this test is</h5>
        <h4 class="grey-text text-darken-2"><?php echo $retake_date["date"]." on ".$retake_date["day"]." at ".$retake_date["time"]?></h4>
        <br>
        <a class="btn btn-large" href="./#takeATest">BACK TO TESTS</a>
    </div>
<?php
    }
};?>
