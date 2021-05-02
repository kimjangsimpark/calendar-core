package com.kjsp.calendar.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class indexController {

  @GetMapping(value="/hello")
  public String indexPage(){
    return "index.html";
  }

}
