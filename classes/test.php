<?php

#HANDLES TEST RELATED FUNCTIONS
class Test
{
    //Variable initialization

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
        <div class="col s12 m6 l3"><h5 class="grey-text text-darken-3">Subject : <small class="grey-text text-darken-2"><?php echo $test["subject_id"];?></small></h5></div>
        
        <div class="col s12 m6 l3"><h5 class="grey-text text-darken-3">Difficulty : <small class="grey-text text-darken-2"><?php echo $test["difficulty"];?></small></h5></div>
        
        <div class="col s12 m6 l3"><h5 class="grey-text text-darken-3">Max Grade : <small class="grey-text text-darken-2"><?php echo $test["max_grade"];?></small></h5></div>
        
        <div class="col s12 m6 l3"><h5 class="grey-text text-darken-3">Passing Grade : <small class="grey-text text-darken-2"><?php echo $test["passing_grade"];?></small></h5></div>        
        
        <div class="col s12 divider"></div>
        
        <!--Test Description-->
        <div class="col s12">
            <br><h4>Description</h4>
            <p><?php echo $test["test_description"];?></p>
        </div>

        <!--Test Instructions-->
        <div class="col s12">
            <br><h4>Instructions</h4>
            <p>This test has about <?php echo $test["number_of_questions"];?> multiple choice questions and should take less than <?php echo $test["time_to_complete"];?> minutes to complete. Click start test when you're ready to begin. </p>
        </div>

        <div class="col s12">
            <br>
            <?php $url_extension = "tests.php?tid=".$test["test_id"]."&edit=".$test["editable"]."&q=";?>
            <a href="<?php echo $url_extension.'1'; ?>" class="btn btn-large ">START TEST</a>
        </div>

    </div>
<?php
    }
    //Displays a test, inclusive of all questions
    public static function DisplayTest($test)
    {

    }

    //Displays a question, depending on whether the question exists in the database or not
    public static function DisplayEditQuestion($test,$question_id)
    {
        //Default variables for questions
        $question_type = "single_choice";
        $q_id = "t".$test["test_id"]."q".$question_id;#unique question id

        //Check if the question exists in the database
        
        //Url extension for redirecting
        $url_extension = "tests.php?tid=".$test["test_id"]."&edit=".$test["editable"]."&q=";
        $question_count = $test["number_of_questions"];

        $is_last_question = ($question_id == $question_count);
        $is_first_question = ($question_id == 1);
        
        ?>
            <!--Test SubTitle section-->
            <div class="row grey darken-2 z-depth-1">
                <div class="container">
                    <div class="row no-margin">
                        <div class="col s12 m4 center-align">
                            <p class="white-text">Question <span class="php-data"><?php echo $question_id; ?></span> of <?php echo $test["number_of_questions"]; ?></p>
                        </div>
                    </div>
                </div>
            </div>

            <!--Test creation - editing section-->
            <div class="row">
                <div class="container">
                    <p class="grey-text">Question Info | Tip : Select the answer(s) to the question by selecting in your question options </p>
                    <div class="divider"></div><br>
                    <div class="row">
                        <div class="col s12">
                            <label for="test_question">Question</label>
                            <textarea class="materialize-textarea" id="test_question" placeholder="Enter question here"></textarea>
                        </div>
                    </div>
                    
                    <!--Question type-->
                    <p class="grey-text text-darken-2">Question type</p>
                    <div class="row">
                        <div class="col s12 m4">
                            <input name="test_question_type" type="radio" id="test_qtype_single" class="test_q_type" value="single_choice" checked data-toggle-qid="<?php echo $q_id;?>"/>
                            <label for="test_qtype_single">Single Choice Question</label>
                        </div>
                        <div class="col s12 m4">
                            <input name="test_question_type" type="radio" id="test_qtype_multiple" class="test_q_type"  value="multiple_choice" data-toggle-qid="<?php echo $q_id;?>"/>
                            <label for="test_qtype_multiple">Multiple Choice Question</label>
                        </div>

                    </div>
                    <div class="divider"></div>

                    <br><br>

                    <!--Single choice question-->
                    <div class="row single_choice_question" data-qid="<?php echo $q_id;?>">
                        <p class="grey-text text-darken-2">Single choice Question</p>
                        <div class="divider col s12"></div><br>
                        <!--Default settings for the question-->
                        <div class="col s12 m6">
                            <label for="single_choices_count">Number of choices</label>
                            <input type="number" value="3" min="1" max="8" id="single_choices_count" class="option_count" required/>
                        </div>
                        <div class="col s12 m6">
                            <label for="question_marks">Marks attainable</label>
                            <input type="number" value="5" min="1" max="20" id="question_marks" required/>
                        </div>
                        
                        <p class="grey-text text-darken-2">Options</p>
                        <div class="divider col s12"></div><br>

                        <!--Options-->
                        <div class=" col s12 s_que_answer_container">
                            
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
                            
                        </div>
                    </div>
                    <!--Multiple choice question-->
                    <div class="row multiple_choice_question hide" data-qid="<?php echo $q_id;?>">
                        <p class="grey-text text-darken-2">Multiple choice Question</p>
                        <div class="divider col s12"></div><br>
                        <!--Default settings for the question-->
                        <div class="col s12 m6">
                            <label for="multiple_choices_count">Number of choices</label>
                            <input type="number" value="3" min="1" max="8" id="multiple_choices_count" class="option_count" required/>
                        </div>
                        <div class="col s12 m6">
                            <label for="question_marks">Marks attainable</label>
                            <input type="number" value="5" min="1" max="20" id="question_marks" required/>
                        </div>
                        
                        
                        <p class="grey-text text-darken-2">Options</p>
                        <div class="divider col s12"></div><br>

                        <!--Options-->
                        <div class="col s12 m_que_answer_container">
                            
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
                            
                        </div>
                    </div>
                    
                    <!--Next and previous buttons-->
                    <div class="row">
                    <?php
                        if(!$is_first_question):#if it is not the first question, display the previous question button
                            $prev_que_url = $url_extension . ($question_id-1);
                    ?>
                        <div class="col s4 left">
                            <a class="btn" href="<?php echo $prev_que_url?>">
                                <i class="material-icons hide-on-large-only">arrow_back</i>
                                <span class="hide-on-med-and-down">PREVIOUS QUESTION</span>
                                </a>
                        </div>
                    <?php
                        endif;
                        if(!$is_last_question):#if it is not the last question
                            $next_que_url = $url_extension . ($question_id+1);
                    ?>
                        <div class="col s4 right">
                            <a class="btn right" href="<?php echo $next_que_url?>">
                                <i class="material-icons hide-on-large-only">arrow_forward
</i>
                                <span class="hide-on-med-and-down">NEXT QUESTION</span>
                                </a>
                        </div>
                    <?php
                        else:#if the last question
                    ?>
                        <div class="col s4 right" id="completeTest">
                            <a class="btn right" href="javascript:void(0)">COMPLETE<span class="hide-on-med-and-down"> TEST</span></a>
                        </div>
                    <?php
                        endif;
                    ?>
                    </div>
                </div>
            </div>
        <?php
    }
};?>