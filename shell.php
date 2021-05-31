<?php
// print_r($_POST);
if(isset($_POST["code"])) {
  $code = $_POST["code"];
  $file = fopen("main.py","w") or die("unable to open file");
  fwrite($file,$code);
  $command = shell_exec("python3 main.py 2>&1");
  echo htmlentities($command);
}
 ?>
