<ul id="slide-out" class="side-nav fixed">
    <li>
        <div class="userView">
            <img class="background" src="images/esomo-nav-bg-02.jpg" width="300">
            <!--<a href="#" onclick="hideSideNav()" data-activates="slide-out" class="button-collapse right"><i class="material-icons">menu</i></a>
            -->
            <a href="#!user" class="hide"><img class="circle" src="images/ppic.jpg"></a>
            <a href="#!name" class="no-padding"><span class="white-text name">
            <?php echo $_SESSION["admin_username"] ?></span></a>
            <br>
        </div>
    </li>
    <li class="active">
        <a href="#!" id="dashboard" data-activates="dashboardTab" class="">Dashboard</a>
    </li>
    <li class="">
        <a href="#!" id="students" data-activates="studentsTab" class="">Students</a>
    </li>
    <li class="">
        <a href="#!" id="teachers" data-activates="teachersTab" class="">Teachers</a>
    </li>
    <li class="">
        <a href="#!" id="principal" data-activates="principalTab" class="">Principal</a>
    </li>
    <li class="">
        <a href="#!" id="superuser" data-activates="superuserTab" class="">Superuser</a>
    </li>
    <li>
        <div class="divider"></div>
    </li>
    <li>
        <a class="waves-effect admin_logout_link" href="?action=admin_logout">Logout</a>
    </li>
</ul>
