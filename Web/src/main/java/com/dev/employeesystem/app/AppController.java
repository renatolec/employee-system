package com.dev.employeesystem.app;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AppController {

    @RequestMapping("/employees")
    public String employeeDashboard(){
        return "dashboard";
    }

    @RequestMapping("/employees/register")
    public String registerEmployee(){
        return "register";
    }

    @RequestMapping("/employees/update")
    public String updateEmployee(@RequestParam(name = "id") int id){
        return "register";
    }
}
