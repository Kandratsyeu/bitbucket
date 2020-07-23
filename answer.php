<?php

class Answer
{	
	var $code;
	var $text;
	function __construct($answerCode, $answerText)
	{
		$this->code = $answerCode;
		$this->text = $answerText;
	}
}