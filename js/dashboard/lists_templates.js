/*global $, jQuery, alert, console*/

var Lists_Templates = function () {
    'use strict';
    //--------------
    
    this.construct = function () {
        console.log('Lists templates created');
        
    };
    
    //--------------------------------------
    
    this.classRoomCard = function (obj) {
    
        var templateOutput = '';
        
        templateOutput += '<div class="col card-col new-class" data-classroom-id="' + obj.classroomid + '">';
        templateOutput += this.classRoomCardData(obj);
        templateOutput += '</div>';
        
        return templateOutput;
    };
    
    //--------------------------------------
    
    this.classRoomCardData = function (obj) {
    
        var templateOutput = '';
        
        templateOutput += '<div class="card ' + obj.classes + '">';
        templateOutput += '<div class="card-content white-text">';
        templateOutput += '<span class="card-title">' + obj.classroomtitle + '</span>';
        templateOutput += '<p>Number of students: ';
        templateOutput += '<span class="php-data">' + obj.totalstudents;
        templateOutput += ' <a id="openStudentsClassList" class="orange-text text-accent-1 tooltipped" data-position="right" data-delay="50" data-tooltip="Number of students in this classroom" href="javascript:void(0)" >';
        templateOutput += '<i class="material-icons">info</i>';
        templateOutput += '</a>';
        templateOutput += '</span>';
        templateOutput += '</p>';
        templateOutput += '<p>Assignments sent: ';
        templateOutput += '<span class="php-data">' + obj.assignmentnumbers;
        templateOutput += ' <a id="openAssignmentsClassList" class="orange-text text-accent-1 tooltipped" data-position="right" data-delay="50" data-tooltip="Number of assignments sent to this classroom" href="javascript:void(0)" >';
        templateOutput += '<i class="material-icons">info</i>';
        templateOutput += '</a>';
        templateOutput += '</span>';
        templateOutput += '</p>';
        templateOutput += '<p>Subject: <span class="php-data">' + obj.classroomsubjectname + '</span></p>';
        templateOutput += '<p>Stream:  <span class="php-data">' + obj.classroomstreamname + '</span></p>';
        templateOutput += '</div>';
        templateOutput += '<div class="card-action">';
        templateOutput += '<a href="#editClassRoom" class="js-edit-classroom modal-trigger">Edit</a>';
        templateOutput += '<a href="javascript:void(0)"  class="">View</a>';
        templateOutput += '</div>';
        
        return templateOutput;
    };
    
    //--------------------------------------
    
    this.assignmentCard = function (obj) {
        
        var templateOutput = '';
        templateOutput += '<div class="col card-col" data-assignment-id="' + obj.assignmentid + '"><div class="card white">';
        //if there is a warning or a notification sent, print it out
        switch (obj.assignmentwarning) {

        case '0':
            //do nothing
            break;
        case '1':
            //warning
            templateOutput += '<div class="assignment-warning red lighten-1 z-depth-2"><p class="white-text">' + obj.assignmentwarningtext + '</p></div>';
            break;
        case '2':
            //info
            //e.g like the assignment was closed/cancelled
            templateOutput += '<div class="assignment-info grey darken-3 z-depth-2"><p class="grey-text text-lighten-3">' + obj.assignmentwarningtext + '</p></div>';
            break;
        default:
            //do nothing
            templateOutput += '';
            break;
        }
        
        templateOutput += '<div class="card-content">';
        templateOutput += '<span class="card-title">' + obj.assignmenttitle + '</span>';
        templateOutput += '<ul class="collapsible " data-collapsible="accordion"><li><div class="collapsible-header">Instructions<i class="material-icons right">arrow_drop_down</i></div><div class="collapsible-body">';
        templateOutput += '<p>' + obj.assignmentinstructions + '</p>';
        templateOutput += '</div></li></ul>';
        templateOutput += '<p>From: <span class="php-data">' + obj.assignmentauthor + '</span></p>';
        templateOutput += '<p>Subject: <span class="php-data">' + obj.assignmentsubject + '</span></p>';
        templateOutput += '<p>Date sent:  <span class="php-data">' + obj.datesent + '</span></p>';
        templateOutput += '<p>Due date:  <span class="php-data">' + obj.duedate + '</span></p>';
        templateOutput += '<p>Resources:  <span class="php-data">';
        //loop through the resources links
        
        templateOutput +=  obj.duedate + '</span></p>';
        templateOutput += '</div>';
        templateOutput += '<div class="card-action right-align">';
        templateOutput += '<a href="#" class="">Submit</a>';
        templateOutput += '</div>';
        templateOutput += '</div></div>';
        
        return templateOutput;
    };
    
    //--------------------------------------
    
    this.teacherAssignmentCard = function (obj) {
        
        var templateOutput = '';
        templateOutput += '<div class="col card-col" data-assignment-id="' + obj.assignmentid + '"><div class="card white">';
        //if there is a warning or a notification sent, print it out
        switch (obj.assignmentwarning) {

        case '0':
            //do nothing
            break;
        case '1':
            //warning
            templateOutput += '<div class="assignment-warning red lighten-1 z-depth-2"><p class="white-text">' + obj.assignmentwarningtext + '</p></div>';
            break;
        case '2':
            //info
            //e.g like the assignment was closed/cancelled
            templateOutput += '<div class="assignment-info grey darken-3 z-depth-2"><p class="grey-text text-lighten-3">' + obj.assignmentwarningtext + '</p></div>';
            break;
        default:
            //do nothing
            templateOutput += '';
            break;
        }
        
        templateOutput += '<div class="card-content">';
        templateOutput += '<span class="card-title">' + obj.assignmenttitle + '</span>';
        templateOutput += '<ul class="collapsible " data-collapsible="accordion"><li><div class="collapsible-header">Instructions<i class="material-icons right">arrow_drop_down</i></div><div class="collapsible-body">';
        templateOutput += '<p>' + obj.assignmentinstructions + '</p>';
        templateOutput += '</div></li></ul>';
        templateOutput += '<p>From: <span class="php-data">' + obj.assignmentauthor + '</span></p>';
        templateOutput += '<p>Subject: <span class="php-data">' + obj.assignmentsubject + '</span></p>';
        templateOutput += '<p>Date sent:  <span class="php-data">' + obj.datesent + '</span></p>';
        templateOutput += '<p>Due date:  <span class="php-data">' + obj.duedate + '</span></p>';
        templateOutput += '<p>Resources:  <span class="php-data">';
        //loop through the resources links
        
        templateOutput +=  obj.duedate + '</span></p>';
        templateOutput += '</div>';
        templateOutput += '<div class="card-action">';
        templateOutput += '<p class="">Submitted assignments: <a href="javascript:void(0)" >' + obj.totalsubmitted + '</a></p>';
        templateOutput += '</div>';
        templateOutput += '</div></div>';
        
        return templateOutput;
    };
    
    //--------------------------------------
    
    this.markedAssignmentCard = function (obj) {
        obj.assignmentwarning = '1';
        var templateOutput = '';
        templateOutput += '<div class="col card-col" data-assignment-id="' + obj.assignmentid + '"><div class="card white">';
        //if there is a warning or a notification sent, print it out
        switch (obj.assignmentwarning) {

        case '0':
            //do nothing
            break;
        case '1':
            //info
            //e.g like the assignment was closed/cancelled
            templateOutput += '<div class="assignment-info right-align"><a href="#" class="deep-orange-text text-accent-3" onclick="getAssignmentComment(' + obj.assignmentid + ')"><i class="material-icons">message</i> ' + obj.assignmentUnreadCommentsNumber + '</a></div>';
            break;
        default:
            //do nothing
            templateOutput += '';
            break;
        }
        
        templateOutput += '<div class="card-content">';
        templateOutput += '<span class="card-title">' + obj.assignmenttitle + '</span>';
        templateOutput += '<ul class="collapsible " data-collapsible="accordion"><li><div class="collapsible-header">Instructions<i class="material-icons right">arrow_drop_down</i></div><div class="collapsible-body">';
        templateOutput += '<p>' + obj.assignmentinstructions + '</p>';
        templateOutput += '</div></li></ul>';
        templateOutput += '<p>From: <span class="php-data">' + obj.assignmentauthor + '</span></p>';
        templateOutput += '<p>Subject: <span class="php-data">' + obj.assignmentsubject + '</span></p>';
        templateOutput += '<p>Date sent:  <span class="php-data">' + obj.datesent + '</span></p>';
        templateOutput += '<p>Due date:  <span class="php-data">' + obj.duedate + '</span></p>';
        templateOutput += '<p>Resources:  <span class="php-data">';
        //loop through the resources links
        
        templateOutput +=  obj.duedate + '</span></p>';
        templateOutput += '</div>';
        templateOutput += '<div class="card-action center-align rain-theme-primary assignment-results">';
        templateOutput += '<p class="white-text">Grade given: <span class="php-data">' + obj.assignmentgradegiven + '</span></p>';
        templateOutput += '</div>';
        templateOutput += '</div></div>';
        
        return templateOutput;
    };
    
    //--------------------------------------
    
    this.testCard = function (obj) {
        obj.testwarning = '1';
        var templateOutput = '';
        templateOutput += '<div class="col card-col" data-test-id="' + obj.testid + '"><div class="card blue-grey darken-1">';
        //if there is a notification sent, print it out
        /*
        switch (obj.testwarning) {

        case '0':
            //do nothing
            break;
        case '1':
            //info
            //e.g like the assignment was closed/cancelled
            templateOutput += '<div class="test-info right-align"></div>';
            break;
        default:
            //do nothing
            templateOutput += '';
            break;
        }
        */
        templateOutput += '<div class="card-content white-text">';
        templateOutput += '<span class="card-title">' + obj.testtitle + '</span>';
        templateOutput += '<p>Subject: <span class="php-data">' + obj.testsubject + '</span></p>';
        templateOutput += '<p>Questions:  <span class="php-data">' + obj.testtotalquestions + '</span></p>';
        templateOutput += '<p>Time:  <span class="php-data">' + obj.testtime + '</span></p>';
        templateOutput += '<p>Difficulty:  <span class="php-data">' + obj.testdifficulty + '</span></p>';
        templateOutput += '<p>Pass mark:  <span class="php-data">' + obj.testpassmark + '</span></p>';
        templateOutput += '<p class="students-taken php-data"><i>' + obj.testtotalstudentstaken + ' students in your class have taken this test</i></p></span></p>';
        templateOutput += '</div>';
        templateOutput += '<div class="card-action center-align rain-theme-primary assignment-results">';
        templateOutput += '<a href="' + obj.testlink + '">Take test</a>';
        templateOutput += '</div>';
        templateOutput += '</div></div>';
        
        return templateOutput;
    };
    
    //--------------------------------------
    
    this.scheduleInfo = function (obj) {

        var templateOutput = '',
            prop,
            classColor = obj.class_color.split(' ');

        //obj.schedule_objectives = text;

        templateOutput += '<div class="scheduledata">';
        templateOutput += '<div class="row">';
        templateOutput += '<div class="col s7">';
        templateOutput += '<h6 class="grey-text">Name</h6>';
        templateOutput += '<div class="col s10 divider"></div>';
        templateOutput += '<p>' + obj.schedule_title + '</p>';
        templateOutput += '<div class="row">';
        templateOutput += '<div class="col s6 no-padding">';
        templateOutput += '<h6 class="grey-text">Class</h6>';
        templateOutput += '<div class="col s10 divider"></div>';
        templateOutput += '<p>' + obj.class_name + '</p>';
        templateOutput += '</div>';
        templateOutput += '<div class="col s6 no-padding">';
        templateOutput += '<h6 class="grey-text">Subject</h6>';
        templateOutput += '<div class="col s10 divider"></div>';
        templateOutput += '<p>' + obj.class_subject_name + '</p>';
        templateOutput += '</div>';
        templateOutput += '</div>';
        templateOutput += '</div>';
        templateOutput += '<div class="col s5">';
        templateOutput += '<h6 class="grey-text">Due</h6>';
        templateOutput += '<div class="col s10 divider"></div>';
        templateOutput += '<p class="red-text">' + obj.due_date_formatted + '</p>';
        templateOutput += '<p class="grey-text">( ' + obj.due_date + ' )</p>';
        templateOutput += '</div></div>';
        templateOutput += '<div class="row">';
        templateOutput += '<div class="col m7 s12">';
        templateOutput += '<div class="row">';
        templateOutput += '<h6 class="grey-text">Description</h6>';
        templateOutput += '<div class="col s10 divider"></div>';
        templateOutput += '<p>' + obj.schedule_description + '</p>';
        templateOutput += '</div>';
        templateOutput += '<div class="row">';
        templateOutput += '<h6 class="grey-text">Objectives</h6>';
        templateOutput += '<div class="col s10 divider"></div>';
        templateOutput += '<p>';

        for (prop in obj.schedule_objectives){

            templateOutput += obj.schedule_objectives[prop];
            templateOutput += '<br>';

        }

        templateOutput += '</p>';
        if (obj.attended_schedule === 0) {

            templateOutput += '</div><br><div class="row"><a class="btn disabled" id="attendedScheduleFromModal">Mark attended<i class="material-icons right">done</i></a></div>';
            templateOutput += '</div>';
            templateOutput += '<div class="col m5 s12"><div data-students-not-attended="" class="row js-students-not-attended card-panel ' + classColor[0] + ' lighten-3">';
            templateOutput += '<h5 class="card-title white-text php-data">Students not attended</h5>';
            templateOutput += '<h6 class="grey-text text-darken-2">Mark students who did not attend the schedule</h6>';
            templateOutput += '<div class="col grey darken-1 s8 divider"></div><br>';

            for (prop in obj.students_in_classroom){
                console.log();
                templateOutput += '<p class="no-margin">';
                templateOutput += '<input type="checkbox" value="' + obj.students_in_classroom[prop].id + '" id="student_' + obj.students_in_classroom[prop].id + '" class="filled-in">';
                templateOutput += '<label class="grey-text text-darken-2" for="student_' + obj.students_in_classroom[prop].id + '">';
                templateOutput += obj.students_in_classroom[prop].name;
                templateOutput += '</label></p>';

            }

            templateOutput += '<br><div class="col grey darken-1 s8 divider"></div><br>';
            templateOutput += '<p class="margin-vert-8"><input type="checkbox" value="0" id="attendanceListMarked" class="filled-in"><label class="op-4 green-text text-darken-2" for="attendanceListMarked">Done</label></p>';
            templateOutput += '</div></div>';


        } else {

            templateOutput += '</div></div>';
            templateOutput += '<div class="col m5 s12"><div data-students-not-attended="" class="row js-students-not-attended card-panel ' + classColor[0] + ' lighten-3">';
            templateOutput += '<h5 class="card-title white-text php-data">Students not attended</h5>';
            templateOutput += '<h6 class="grey-text text-darken-2">List of students who did not attend the schedule</h6>';
            templateOutput += '<div class="col grey darken-1 s8 divider"></div>';
            templateOutput += '<ol>';

            for (prop in obj.students_not_attended){

                templateOutput += '<li data-student-id="' + obj.students_not_attended[prop].id + '">';
                templateOutput += obj.students_not_attended[prop].name;
                templateOutput += '</li>';

            }

            templateOutput += '</ol>';
            templateOutput += '</div></div>';
        }

        return templateOutput;

    };

    //--------------------------------------

    this.modalTemplate = function (obj) {
        
        var templateOutput = '';
        
        templateOutput += '<div id="' + obj.modalId + '" class="modal modal-fixed-footer">';
        templateOutput += '<div class="modal-content">';
        templateOutput += '<h4>' + obj.templateHeader + '</h4>';
        templateOutput += obj.templateBody;
        templateOutput += '</div>';
        templateOutput += '<div class="modal-footer">';
        
        if (typeof obj.extraActions !== 'undefined') {
            templateOutput += obj.extraActions;

        }
        
        templateOutput += '<a href="javascript:void(0)" id="modalFooterCloseAction" class=" modal-action modal-close waves-effect waves-green btn-flat">close</a>';
        templateOutput += '</div>';
        templateOutput += '</div>';
        
        return templateOutput;
    };
    
    //--------------------------------------
    
    this.resourcesModalTemplate = function (obj) {

        var templateOutput = '';

        templateOutput += '<div id="' + obj.modalId + '" class="modal modal-fixed-footer">';
        templateOutput += '<div class="modal-content"><div class="js-drag-drop-area">';
        templateOutput += '<h4 class="white-text">' + obj.templateHeader + '</h4>';
        templateOutput += '<div class="row no-margin">';
        templateOutput += '<div id="resourcesTotalInfo" class="col m6 s12">';
        templateOutput += '<h6 class=" op-4">To upload</h6>';
        templateOutput += '<h4 class="white-text"><span id="totalResources">0</span> files</h4>';
        templateOutput += '<br><div class="progress" style="width:0%;"><div class="determinate" style="width:0%;"></div></div>';
        templateOutput += '<h6 class="num-progress hide rain-theme-primary-text text-lighten-3"><i>Uploading <span class="js-num-progress">0%</span></i></h6>';
        templateOutput += '</div>';
        templateOutput += '<div class="col m6 s12">';
        templateOutput += '<form id="createResourcesForm">';
        templateOutput += '<div class=" input-field col s12 file-field ">';
        templateOutput += '<div class="btn right">';
        templateOutput += '<span>add resources</span>';
        templateOutput += '<input type="file" multiple name="resources">';
        templateOutput += '</div>';
/*
        templateOutput += '<div class="file-path-wrapper">';
        templateOutput += '<input class="file-path validate" type="text" placeholder="Upload one or more files">';
        templateOutput += '</div>';
*/
        templateOutput += '</div>';
        templateOutput += '<input type="submit" name="submitBtn" class="hide btn material-icons btn-floating btn-large upload-btn" value="&#xE2C6;" />';
        //templateOutput += '<iframe id="upload_target" name="upload_target" src="#" style="width:0;height:0;border:0px solid transparent;"></iframe>';
        templateOutput += '</form>';
        templateOutput += '<div style="padding-top:20px;margin-top:20px;" class="hide-on-med-and-down"><br><h6 class="right-align op-4">or drag and drop on the colored area.</h6>';
        templateOutput += '</div></div></div></div>';
        templateOutput += '<div class="row no-margin" id="errorContainer"><ul></ul></div>';
        templateOutput += '<div class="row" id="resourcesList"><div class="container" >';
        templateOutput += '</div></div>';
        templateOutput += '</div>';
        templateOutput += '<div class="modal-footer">';
        templateOutput += '<a href="javascript:void(0)" id="modalFooterCloseAction" class=" modal-action modal-close waves-effect waves-red btn-flat">close</a>';
        templateOutput += '<a href="javascript:void(0)" id="uploadResource" class=" modal-action waves-effect waves-green btn disabled"><i class="material-icons left">&#xE2C6;</i>upload</a>';
        templateOutput += '</div>';
        templateOutput += '</div>';

        return templateOutput;

    };

    //--------------------------------------

    this.documentUploadsErrorListTemplate = function (obj, obj2) {

        var templateOutput = '', v;

        templateOutput += '<li class="red-text text-lighten-1">';

        for (v = 0; v < obj2.length; obj2++) {
            if (obj2[v] === 0) {
                templateOutput += '<u>' + obj.name + '</u> is not a supported file format.';
                templateOutput += '</li>';

                return templateOutput;

            } else if (obj2[v] === 1) {
                templateOutput += '<u>' + obj.name + '</u> is too large (' + (obj.size / (1024 * 1024)).toFixed(2) + ' mbs). Allowed maximum of 50mbs per file.';

            } else {
                templateOutput += '<u>' + obj.name + '</u> cannot be uploaded.';

            }
        }

        templateOutput += '</li>';

        return templateOutput;

    };

    //--------------------------------------

    this.resourcesListTemplate = function (obj, i, error) {

        var templateOutput = '', errorClass = '';

        if (error) {
            errorClass = 'red lighten-3';
        }

        templateOutput += '<div class="' + errorClass + ' row no-margin padding-vert-8" data-index="' + i + '"><div class="col s5">';
        templateOutput += '<div class="card document-view">';
        //info row ---
        templateOutput += '<div class="info row no-margin">';
        templateOutput += '<div class="col s12"><p class="title">';
        templateOutput += obj.name;
        templateOutput += '</p>';
        templateOutput += '<p class="size">';
        templateOutput += (obj.size / (1024 * 1024)).toFixed(2) + ' mbs';
//        templateOutput += '<div class="col s3"><p class="size right-align">';
//        templateOutput += (obj.size / (1024*1024)).toFixed(2) + ' mbs';
        templateOutput += '</p>';
        templateOutput += '<a class="btn-floating halfway-fab right red white-text accent-2 js-document-delete"><i class="material-icons">delete</i></a>';
        templateOutput += '</div></div>';
        templateOutput += '</div></div>';
        //end of info row ---
        templateOutput += '<div class="col s7">';
        templateOutput += '<div class="row no-margin">';
        templateOutput += '<div class="input-field col s12">';
        templateOutput += '<select id="resourceSubjectType" name="resource_subject" required class="browser-default">';
        templateOutput += '<optgroup label="sciences"><option value="1">Mathematics</option><option value="5">Physics</option><option value="6">Biology</option><option value="7">Chemistry</option></optgroup><optgroup label="languages"><option value="3">Kiswahili</option><option value="4">French</option><option value="9">Literature</option></optgroup><optgroup label="humanities"><option value="8">Religion</option><option value="13">History</option></optgroup><optgroup label="extras"><option value="14">Art and Design</option><option value="15">ICT</option><option value="16">Physical Education</option><option value="17">Music</option><option value="18">Business studies</option></optgroup>';
        //templateOutput += obj.subjectoptions;
        templateOutput += '</select>';
//        templateOutput += '<label>Subject</label>';
        templateOutput += '</div>';
        templateOutput += '<div class="input-field no-margin col s12">';
        templateOutput += '<textarea id="resourceDescription" class="materialize-textarea"></textarea>';
        templateOutput += '<label for="resourceDescription">Description</label></div>';
        templateOutput += '</div></div></div>';
        //templateOutput += '<div class="divider"></div>';

        return templateOutput;

    };

    //--------------------------------------

    this.documentsListTemplate = function (obj, i) {

        var templateOutput = '';

        templateOutput += '<div class="' + obj.errorClass + ' col s12 m6 l4"  data-index="' + i + '">';
        templateOutput += '<div class="card document-view">';
        //info row ---
        templateOutput += '<div class="info row no-margin">';
        templateOutput += '<div class="col s12"><p class="title">';
        templateOutput += obj.name;
        templateOutput += '</p>';
        templateOutput += '<p class="size">';
        templateOutput += (obj.size / (1024 * 1024)).toFixed(2) + ' mbs';
//        templateOutput += '<div class="col s3"><p class="size right-align">';
//        templateOutput += (obj.size / (1024*1024)).toFixed(2) + ' mbs';
        templateOutput += '</p>';
        templateOutput += '<a class="js-document-delete btn-floating halfway-fab right red white-text accent-2"><i class="material-icons">delete</i></a>';
        templateOutput += '</div></div>';
        templateOutput += '</div></div>';

        return templateOutput;

    };

    //--------------------------------------

    this.listModalTemplate = function (obj) {
        
        var templateOutput = '';
        
        templateOutput += '<div id="' + obj.modalId + '" class="modal modal-fixed-footer">';
        templateOutput += '<div class="modal-content">';
        templateOutput += '<h4>' + obj.templateHeader + '</h4>';
        templateOutput += obj.templateBody;
        templateOutput += '</div>';
        templateOutput += '<div class="modal-footer">';
        templateOutput += '<a href="javascript:void(0)" id="modalFooterCloseAction" class=" modal-action modal-close waves-effect waves-green btn-flat">close</a>';
        templateOutput += '</div>';
        templateOutput += '</div>';
        
        return templateOutput;
    };
    
    //--------------------------------------
    
    this.chatBoxBar = function (obj) {

        var templateOutput = '',
            commentType = '';
        
        templateOutput += '<div id="' + obj.id + '" class="chatbox-container z-depth-1 ' + obj.uistate + ' grey lighten-5">';
        templateOutput += '<div class="chatbox"><div class="chatbox-header-container">';
        templateOutput += '<nav class="box-header z-depth-0">';
        templateOutput += '<p data-user-id="' + obj.userid + '" data-user-type="' + obj.usertype + '" class="white-text bold heavy box-title">' + obj.username + '</p>';
        templateOutput += '<div class="box-action">';
        templateOutput += '<a href="#!" class="pad-6 marg-8 js-close-chatbox"><i class="material-icons">close</i> </a>';
        templateOutput += '<a href="#!" class="pad-6 marg-8 js-chatbox-menu"><i class="material-icons">more_horiz</i> </a>';
        templateOutput += '</div></nav>';
        templateOutput += '<div class="padding-horiz-16 box-sub-header grey lighten-4 z-depth-1-half">';
        templateOutput += '<p class="no-margin js-chat-ref light grey-text text-darken-3" data-ref="' + obj.chatsectionref + '">Ref: <span>' + obj.chatref + '</span></p>';
        templateOutput += '</div></div>';
        templateOutput += '<div class="box-body padding-vert-8">';
        templateOutput += obj.chats;
        templateOutput += '</div>';
        templateOutput += '<div class="box-footer no-margin pad-8">';
        templateOutput += '<input type="text" class="chat-input marg-8">';
        templateOutput += '<button class="padding-horiz-16 chat-btn btn-flat js-btn-send marg-6"><i class="material-icons">send</i></button>';
        templateOutput += '</div></div></div>';
        
        return templateOutput;
    };
    
    //--------------------------------------
    
    this.commentsModal = function (obj) {

        var templateOutput = '',
            commentType = '';

        switch (obj.commentType) {

        case 'schedule':
            commentType = 'schedule';

            break;
        case 'assignment':
            commentType = 'assignment';
            break;
        case 'ass_submission':
            commentType = 'assignment submission';
            break;
        default:
            console.log('error. Comment type set to default.');
            commentType = '';
            break;
        }

        var title = ((commentType !== '') ? '' /* + commentType + ' comments - ' */ + obj.title + " comments " + obj.extraInfo : 'Comments');
        
        templateOutput += '<div id="' + obj.modalId + '" class="modal modal-fixed-footer">';
        templateOutput += '<div class="modal-content">';
        templateOutput += '<h4 class="small-text php-data">';
        templateOutput += title.toUpperCase();
        templateOutput += '</h4>';
        templateOutput += '<div class="divider"></div>';
        templateOutput += obj.templateBody;
        templateOutput += '</div>';
        templateOutput += '<div class="modal-footer">';

        if (obj.canComment === true) {
            templateOutput += this.commentExtraFooterActions(obj.id, true, obj.commentType);
        }

        templateOutput += '<a href="javascript:void(0)" id="modalFooterCloseAction" class=" modal-action modal-close waves-effect waves-green btn-flat">close</a>';
        templateOutput += '</div>';
        templateOutput += '</div>';

        return templateOutput;
    };

    //--------------------------------------

    this.commentList = function (obj, self) {

        var templateOutput = '';

        templateOutput += '<div data-comment-id="' + obj.comment_id + '" class="comment-item new-class padding-vert-8 ' + ((obj.poster_name === 'You') ? 'grey lighten-3' : ' ') + '">';
        templateOutput += '<br><p class="js-name marg-6 grey-text text-darken-1"><a href="' + obj.poster_link + '" class="underline inherit-color">' + obj.poster_name + '</a><a href="javascript:void(0)" class="' + ((self === true) ? ' ' : 'hide') + ' padding-horiz-8 margin-horiz-8 right js-edit-comment btn-icon inherit-color"><i class="material-icons">edit</i></a><a href="javascript:void(0)" class="' + ((self === true) ? ' ' : 'hide') + ' padding-horiz-8 margin-horiz-8 right btn-icon inherit-color js-delete-comment"><i class="material-icons">delete</i></a></p>';
        templateOutput += '<p class="js-comment marg-8 black-text">' + obj.comment_text + '</p>';
        templateOutput += '<p class="js-date marg-6 grey-text text-darken-1">' + obj.date + '</p>';
        templateOutput += '<br><div class="divider"></div>';
        templateOutput += '</div>';

        return templateOutput;
    };

    //--------------------------------------

    this.returnedAssignmentSubmissionTemplate = function (obj) {

        var templateOutput = '';

        templateOutput += '<li data-submission-id="' + obj.id + '" class="new-class container col s12 m6 ass-submission-item">';
        templateOutput += '<div class="item-details"><p data-student-id="' + obj.studentid + '" class="pad-8 student-name">';
        templateOutput += obj.studentname + ' <br>(Adm No.<span class="primary-text-color">' + obj.studentid + '</span>) </p>';
        templateOutput += '</div><div class="item-action pad-8"><div data-ass-grade="' + obj.grade + '" class="chip marg-horiz-8">' + obj.grade + '/' + obj.maxgrade + '</div>';
        templateOutput += '<a class="margin-horiz-16 pad-8 btn-icon js-open-comment-bar" data-root-hook="ass_submission" href="javascript:void(0)"><i class="material-icons">comment</i></a>';
/*
        <div class="item-action-extra hide">
            <div class="input-field inline comment " data-id="<?php echo $sub['submission_id'] ?>" data-submission-id="<?php echo $sub['submission_id'] ?>">
                <input data-student-id="<?php echo $student_adm_no; ?>" type="text" placeholder="comment" class="js-comment-bar browser-default normal" name="comment">
                <label for="comment">
                    <i class="material-icons">comment</i>
                </label>
                <br>
                <a class='right btn-inline js-add-comment js-no-modal' data-root-hook="ass_submission" href="javascript:void(0)">send</a>
                <a class='right btn-inline js-get-comments' data-root-hook="ass_submission" href="javascript:void(0)">all</a>
            </div>
        </div>
*/
        templateOutput += '</div></li>';

        return templateOutput;
    };

    //--------------------------------------

    this.cancelCommentEdit = function () {

        var templateOutput = '';

        templateOutput += '<a href="javascript:void(0)" class="padding-horiz-8 margin-horiz-8 right inherit-color js-cancel-edit-comment"><i class="material-icons">close</i></a>';

        return templateOutput;
    };

    //--------------------------------------

    this.noCommentMessage = function () {

        var templateOutput = '';

        templateOutput += '<div data-comment-id="null" class="comment-item padding-vert-8">';
        templateOutput += '<br><p class="marg-8 grey-text text-darken-1">No comments found</p>';
        templateOutput += '<br><div class="divider"></div>';
        templateOutput += '</div>';

        return templateOutput;
    };

    //--------------------------------------

    this.classroomCardListContainer = function (obj) {
        
        var templateOutput = '';
        
        templateOutput += '<div class="row"id="classroomCardList">';
        templateOutput += '</div>';
        
        return templateOutput;
    };
    
    //--------------------------------------
    
    this.assignmentCardListContainer = function (obj) {
        
        var templateOutput = '';
        
        templateOutput += '<div class="row"id="assignmentCardList">';
        templateOutput += '</div>';
        
        return templateOutput;
    };
    
    //--------------------------------------
    
    this.esomoModalTemplate = function (obj) {
        
        obj.progressWidth = '1%';
        
        var formattedProgressWidth = $.trim(obj.progressWidth).split("%").join(""),
            warningClass = 'red',
            okayClass = 'green',
            infoClass = 'amber',
            noneClass = 'grey',
            colorClass = noneClass,
            textColorClass = noneClass + '-text',
            templateOutput = '';
        
        if (formattedProgressWidth === 0) {
        
            colorClass = noneClass;
            textColorClass = noneClass + '-text text-lighten-1';
        
        } else if (formattedProgressWidth >= 1 && formattedProgressWidth <= 31) {
            
            colorClass = okayClass + ' lighten-2';
            textColorClass = okayClass + '-text text-darken-2';
        
        } else if (formattedProgressWidth >= 31 && formattedProgressWidth <= 80) {
            
            colorClass = okayClass + ' lighten-2';
            textColorClass = okayClass + '-text text-darken-2';
        
        } else if (formattedProgressWidth >= 81 && formattedProgressWidth <= 92) {
            
            colorClass = infoClass;
            textColorClass = infoClass + '-text';
        
        } else if (formattedProgressWidth >= 93 && formattedProgressWidth <= 100) {
            
            colorClass = warningClass;
            textColorClass = warningClass + '-text';
        
        } else {
            
            console.log('formattedProgressWidth: ');
            console.log(formattedProgressWidth);
            
        }
        
        
        templateOutput += '<div id="esomoModal' + obj.modalId + '" class="esomo-modal modal modal-fixed-footer">';
        templateOutput += '<div class="modal-content">';
        templateOutput += '<h4>' + obj.templateHeader + '</h4>';
        templateOutput += obj.templateBody;
        templateOutput += '</div>';
        templateOutput += '<div class="modal-footer row">';
        templateOutput += '<div class="col s12 m6"><div class="progress modal-progress"><div class="determinate ' + colorClass + '" style="width:' + obj.progressWidth + ';"><span class=" ' + textColorClass + ' ">' + obj.progressWidth + '</span></div></div></div>';
        templateOutput += '<div class="col m3 s6"><a href="javascript:void(0)" id="modalFooterCloseAction" class="right modal-action modal-close waves-effect waves-red red-text btn-flat">close</a></div>';
        templateOutput += '<div class="col m3 s6"><a href="javascript:void(0)" id="modalFooterActionAdd" class="right modal-action waves-effect waves-green btn">' + obj.modal_action + '</a></div>';
        templateOutput += '</div>';
        templateOutput += '</div>';
        templateOutput += '</div>';
        
        return templateOutput;
        
    };
    
    //--------------------------
    
    this.updateModalProgressTemplate = function (str) {
        
        var obj = {"updateWidth": str},
        
            esomoModalTemplate = this.esomoModalTemplate(obj);
        
        //console.log(esomoModalTemplate);
            
        return esomoModalTemplate;
            
        
    };
    
    //--------------------------
    
    this.studentList = function (obj) {
        
        var templateOutput = '';
        
        templateOutput += '<li>' + obj.name + '</li>';
            
        return templateOutput;
        
    };
    
    //--------------------------
    
    this.studentTable = function (obj) {
        
        var templateOutput = '';
        
        templateOutput += '<table>';
        templateOutput += '<thead><tr>';
        //templateOutput += '<th data-field="action"></th>';
        templateOutput += '<th data-field="adm_no">Admission no.</th>';
        templateOutput += '<th data-field="name">Full name</th>';
        templateOutput += '</tr></thead>';
        templateOutput += '<tbody>';
        templateOutput += obj.listData;
        templateOutput += '</tbody>';
        templateOutput += '</table>';
            
        return templateOutput;
        
    };
    
    //--------------------------
    
    this.studentTableList = function (obj) {
        
        var templateOutput = '';
        
        templateOutput += '<tr>';
        templateOutput += '<td>' + obj.id + '</td>';
        templateOutput += '<td>' + obj.name + '</td>';
        templateOutput += '</tr>';
            
        return templateOutput;
        
    };
    
    //--------------------------
    
    this.assignmentTable = function (obj) {
        
        var templateOutput = '';
        
        templateOutput += '<table class="responsive-table">';
        templateOutput += '<thead><tr>';
        //templateOutput += '<th data-field="action"></th>';
        templateOutput += '<th data-field="name">Name</th>';
        templateOutput += '<th data-field="due_date">Due</th>';
        templateOutput += '<th data-field="date_sent">Date created</th>';
        templateOutput += '<th data-field="sent">Sent</th>';
        templateOutput += '<th data-field="pass_grade">Pass grade</th>';
        templateOutput += '</tr></thead>';
        templateOutput += '<tbody>';
        templateOutput += obj.listData;
        templateOutput += '</tbody>';
        templateOutput += '</table>';
            
        return templateOutput;
        
    };
    
    //--------------------------
    
    this.assignmentTableList = function (obj) {
        
        var templateOutput = '';
        
        templateOutput += '<tr data-ass-id="' + obj.id + '">';
        templateOutput += '<td>' + obj.name + '</td>';
        templateOutput += '<td>' + obj.duedate + '</td>';
        templateOutput += '<td>' + obj.datecreated + '</td>';
        templateOutput += '<td>' + ((obj.sent  == 1) ? 'Yes' : 'no') + '</td>';
        templateOutput += '<td>' + obj.passgrade + '</td>';
        templateOutput += '</tr>';
            
        return templateOutput;
        
    };
    
    //--------------------------
    
    this.classroomTable = function (obj) {
        
        var templateOutput = '';
        
        templateOutput += '<table class="responsive-table">';
        templateOutput += '<thead><tr>';
        templateOutput += '<th ></th>';
        templateOutput += '<th data-field="name">Classroom name</th>';
        templateOutput += '<th data-field="subject">Subject</th>';
        templateOutput += '<th data-field="stream">Stream</th>';
        templateOutput += '<th data-field="students">No. of Students</th>';
        templateOutput += '</tr></thead>';
        templateOutput += '<tbody class="list">';
        templateOutput += obj.listData;
        templateOutput += '</tbody>';
        templateOutput += '</table>';
            
        return templateOutput;
        
    };
    
    //--------------------------
    
    this.classroomTableList = function (obj) {
        
        var templateOutput = '';
        
        templateOutput += '<tr>';
        templateOutput += '<td><p class="no-margin"><input type="checkbox" value="' + obj.id + '" class="filled-in" id="' + obj.id + '"><label for="' + obj.id + '"></label></p></td>';
        templateOutput += '<td>' + obj.name + '</td>';
        templateOutput += '<td>' + obj.subject + '</td>';
        templateOutput += '<td>' + obj.stream + '</td>';
        templateOutput += '<td>' + obj.totalstudents + '</td>';
        templateOutput += '</tr>';
            
        return templateOutput;
        
    };
    
    //--------------------------------------
    
    this.scheduleList = function (obj) {
        
        var templateOutput = '';
        
        templateOutput += '<tr class="new-class" data-schedule-id="' + obj.scheduleid + '">';
        templateOutput += this.scheduleListData(obj);
        templateOutput += '</tr>';
        
        return templateOutput;
        
    };
    
    //--------------------------------------
    
    this.scheduleListData = function (obj) {
        
        var templateOutput = '';
        
        templateOutput += '<td class="js-schedule-title">' + obj.schedulename + '</td>';
        templateOutput += '<td>' + obj.scheduledescription + '</td>';
        templateOutput += '<td class="right-align">' + obj.scheduledatetime + '</td>';
        templateOutput += '<td class="right-align schedule-action" width="120">';
        templateOutput += '<a class="btn-icon js-open-schedule" href="javascript:void(0)"><i class="material-icons">expand_more</i></a>';
        templateOutput += ((obj.scheduletype === 'done') ? '<a class="btn-icon js-unmark-done-schedule" href="javascript:void(0)"><i class="material-icons">undo</i></a>' : '');
        templateOutput += '<a class="btn-icon js-get-comments" data-root-hook="schedule" href="javascript:void(0)"><i class="material-icons">comments</i></a>';
        templateOutput += '</td>';
        
        return templateOutput;
        
    };
    
    //--------------------------------------
    
    this.scheduleTable = function (obj) {
        
        obj.includethead = 'hide';
        
        var templateOutput = '';
        
        templateOutput += '<table class="bordered-light responsive-table" id="pendingScheduleTable">';
        templateOutput += '<thead class="' + obj.includethead + '">';
        templateOutput += '<tr>';
        templateOutput += '<th data-field="id" class="center-align">' + obj.tableidcolumnname + '</th>';
        templateOutput += '<th data-field="id" class="center-align">' + obj.tableschedulenamecolumnname + '</th>';
        templateOutput += '<th data-field="id" class="center-align">' + obj.tablescheduledescriptioncolumnname + '</th>';
        templateOutput += '<th data-field="id" class="center-align">' + obj.tablescheduletimecolumnname + '</th>';
        templateOutput += '<th data-field="id" class="center-align">' + obj.tablescheduleextraactionscolumn + '</th>';
        templateOutput += '</tr>';
        templateOutput += '</thead>';
        templateOutput += '<tbody>';
        templateOutput += obj.tableLists;
        templateOutput += '</tbody>';
        templateOutput += '</table>';
        
        return templateOutput;
        
    };
    
    //--------------------------------------
    
    this.paginationTemplate = function (obj, j) {
        
        obj.position = 'center';
        
        var templateOutput = '',
            c;
        
        templateOutput += '<ul class="pagination ' + obj.position + '">';
        
        for (c = 1; c <= obj.pages; c++) {
            
            if (j === c && j === 1) {
                //if the first page is active
                templateOutput += '<li class="disabled"><a href="javascript:void(0)"><i class="material-icons">chevron_left</i></a></li>';
                templateOutput += '<li class="active"><a href="javascript:void(0)">' + obj.c + '</a></li>';
            
            } else if (c === 1 && j !== 1) {
                //if the first page is not active
                templateOutput += '<li ><a href="javascript:void(0)"><i class="material-icons">chevron_left</i></a></li>';
                templateOutput += '<li class="waves-effect"><a href="javascript:void(0)">' + obj.c + '</a></li>';
                
            } else if (j === c) {
                //The current active page
                templateOutput += '<li class="active"><a href="javascript:void(0)">' + obj.c + '</a></li>';
                
            } else if (j === obj.pages && c === j) {
                //if the last page is active
                templateOutput += '<li class="active"><a href="javascript:void(0)">' + obj.c + '</a></li>';
                templateOutput += '<li class="disabled"><a href="javascript:void(0)"><i class="material-icons">chevron_right</i></a></li>';
            
            } else if (c === obj.pages && j !== obj.pages) {
                //if the last page is not active
                templateOutput += '<li class="waves-effect"><a href="javascript:void(0)">' + obj.c + '</a></li>';
                templateOutput += '<li ><a href="javascript:void(0)"><i class="material-icons">chevron_right</i></a></li>';
                
            } else {
                //Page not active
                templateOutput += '<li class="waves-effect"><a href="javascript:void(0)">' + obj.c + '</a></li>';
            }
            
        }
        
        templateOutput += '</ul>';
        templateOutput += '<br>';
        
        return templateOutput;
        
    };
    
    //--------------------------------------
    
    this.objective = function (obj) {
    
        var templateOutput = '';
        
        templateOutput += '<li>';
        templateOutput += obj.text;
        templateOutput += ((obj.isSubtopic === false) ? '' : '<span class="tiny-info">ST</span>');
        templateOutput += ((obj.removable === false) ? '' : '<span class="right "><a class="mini-link btn-icon no-padding" href="javascript:void(0)">remove</a></span>');
        templateOutput += '</li>';

        return templateOutput;
        
    };
    
    //--------------------------------------
    
    this.resourceSubjectGroup = function (obj) {

        var templateOutput = '<div class="subject-group row" data-subject-group="' + obj.id + '">';

        templateOutput += '<h4 class="grey-text text-darken-2 subject-group-header">' + obj.id + '</h4>';
        templateOutput += '<div class="subject-group-body row">';
        templateOutput += obj.el;
        templateOutput += '</div><br><div class="divider"></div><br></div>';

        return templateOutput;

    };

    //--------------------------------------

    this.infoExtraFooterActions = function (obj, id) {

        var templateOutput = '',
            classes = '';

        $.each(obj, function (i, el) {

            switch (el) {
            case true:

                if (i === 'Previous') {

                    templateOutput += '<a style=" padding-left: 12px; padding-right: 12px; " class="text-lighten-1 modal-action left btn btn-flat " href="javascript:void(0)" title="read the previous schedule in the list" id="' + id + 'Card' + i + '"><i class="material-icons left">navigate_before</i>previous schedule</a>';
                } else if (i === 'Next') {

                    templateOutput += '<a style=" padding-left: 12px; padding-right: 12px; " class="text-lighten-1 modal-action left btn btn-flat " href="javascript:void(0)" title="read the next schedule in the list" id="' + id + 'Card' + i + '">next schedule<i class="material-icons right">navigate_' + i.toLowerCase() + '</i></a>';
                } else if (i === 'Delete') {

                    templateOutput += '<a style=" padding-left: 12px; padding-right: 12px;" class="red-text text-lighten-1 modal-action left btn btn-flat transparent" title="delete the schedule" href="javascript:void(0)" id="' + id + 'Card' + i + '"><i class="material-icons">' + i.toLowerCase() + '</i></a>';
                } else if (i === 'Edit') {

                    templateOutput += '<a style=" padding-left: 12px; padding-right: 12px; margin-right:24px;" class="grey-text text-lighten-1 modal-action left btn btn-flat transparent" title="edit the schedule" href="javascript:void(0)" id="' + id + 'Card' + i + '"><i class="material-icons">' + i.toLowerCase() + '</i></a>';
                }

                break;
            case false:

                if (i === 'Previous') {

                    templateOutput += '<a style=" padding-left: 12px; padding-right: 12px; " class=" disabled text-lighten-1 modal-action left btn btn-flat " href="javascript:void(0)" title="read the previous schedule in the list" id="moreScheduleCard' + i + '"><i class="material-icons left">navigate_before</i>previous schedule</a>';
                } else if (i === 'Next') {

                    templateOutput += '<a style=" padding-left: 12px; padding-right: 12px; " class=" disabled text-lighten-1 modal-action left btn btn-flat " href="javascript:void(0)" title="read the next schedule in the list" id="moreScheduleCard' + i + '">next schedule<i class="material-icons right">navigate_' + i.toLowerCase() + '</i></a>';

                } else if (i === 'Delete') {

                    templateOutput += '<a style=" padding-left: 12px; padding-right: 12px; " class="red-text disabled text-lighten-1 modal-action left btn btn-flat transparent" href="javascript:void(0)"  title="delete the schedule" id="moreScheduleCard' + i + '"><i class="material-icons">' + i.toLowerCase() + '</i></a>';
                }

                break;

            default:

                return false;

            }

        });

        return templateOutput;

    };

    //--------------------------------------

    this.editExtraFooterActions = function (obj) {
        
        var templateOutput = '',
            classes = '';
        
        $.each(obj, function (i, el) {
            
            
            switch (el) {

            case true:

                if (i === 'Delete' || i === 'delete') {

                    classes = 'red-text';

                } else {

                    classes = 'grey-text';

                }

                templateOutput += '<a style=" padding-left: 12px; padding-right: 12px; " class="' + classes + ' text-lighten-1 modal-action left btn btn-flat transparent" href="javascript:void(0)" id="moreCard' + i + '"><i class="material-icons">' + i.toLowerCase() + '</i></a>';

                break;

            case false:

                templateOutput += '';

                break;

            default:

                return false;

            }
            
        });
        
        return templateOutput;
    };
    
    //-------------------------
    
    this.commentExtraFooterActions = function (id, can_comment, comment_type) {

        var templateOutput = '';

        templateOutput += '<div class="input-field inline comment margin-horiz-16 col s8" data-comment-type="' + comment_type + '" data-id="' + id + '">';
        templateOutput += '<label for="comment">';
        templateOutput += '<i class="material-icons">comment</i>';
        templateOutput += '</label>';
        templateOutput += '<input type="text" placeholder="comment" class="col s8 js-comment-bar browser-default modal-comment " name="comment">';

        if (can_comment === true) {
            templateOutput += '<a class="marg-6 btn js-add-comment" data-root-hook="' + comment_type + '" href="javascript:void(0)">comment</a>';

        }

        templateOutput += '</div>';

        return templateOutput;
    };

    //-------------------------

    this.noResourceMessage = function () {
        var templateOutput = '';

        templateOutput += '<div class="section grey lighten-2 center">';
        templateOutput += '<h5 class="center grey-text text-darken-1">No resources were found.<br><br>Once resources are uploaded they will appear here</h5>';
        templateOutput += '</div>';

        return templateOutput;

    };

    //-------------------------

    this.scheduleActionButton = function (eventClass, icon) {
        var templateOutput = '';

        templateOutput += '<a class="btn-icon ' + eventClass + '" href="javascript:void(0)"><i class="material-icons">';
        templateOutput += icon;
        templateOutput += '</i></a>';

        return templateOutput;

    };

    //-------------------------

    this.scheduleDummyData = function (dataType) {
        var templateOutput = '';

        templateOutput += "<tr class='js-dummy-schedule-data'><td>We can't find any " + dataType + " schedule</td><td>--</td><td>--</td><td>--</td></tr>";

        return templateOutput;

    };

    //-------------------------

    this.scheduleListObjective = function (str) {
        var templateOutput = '';

        templateOutput += '<li>' + str + '<span class="right "><a class="mini-link btn-icon no-padding" href="javascript:void(0)">remove</a></span></li>';

        return templateOutput;

    };

    //-------------------------

    this.subjectsSelectOptions = function () {
        var templateOutput = '';

        templateOutput += '<optgroup label="sciences"><option value="1">Mathematics</option><option value="5">Physics</option><option value="6">Biology</option><option value="7">Chemistry</option></optgroup>';
        templateOutput += '<optgroup label="languages"><option value="3">Kiswahili</option><option value="4">French</option><option value="9">Literature</option></optgroup>';
        templateOutput += '<optgroup label="humanities"><option value="8">Religion</option><option value="13">History</option></optgroup>';
        templateOutput += '<optgroup label="extras"><option value="14">Art and Design</option><option value="15">ICT</option><option value="16">Physical Education</option><option value="17">Music</option><option value="18">Business studies</option></optgroup>';

        return templateOutput;

    };

    //-------------------------

    this.construct();
    
};

