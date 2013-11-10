<?php
file_put_contents("logfile.txt", $_POST["log_text"] . "\r\n", FILE_APPEND);
?>