package com.dev.abiliolanches.api;

import com.dev.abiliolanches.dao.EmployeeDAO;
import com.dev.abiliolanches.entity.Employee;
import com.dev.abiliolanches.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class EmployeeController {

    private EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/employees")
    public List<Employee> findAll(@RequestParam Optional<String> fname){
        if(fname.isPresent())
            return employeeService.findByFNameLike(fname.get());
        return employeeService.findAll();
    }

    @GetMapping("/employees/{employeeId}")
    public Employee findById(@PathVariable int employeeId){
        return employeeService.findById(employeeId);
    }

    @PostMapping("/employees")
    public void save(@RequestBody Employee employee){
        employeeService.save(employee);
    }

    @DeleteMapping("/employees/{employeeId}")
    public void deleteById(@PathVariable int employeeId){
        employeeService.deleteById(employeeId);
    }

}
