package com.dev.abiliolanches.service;

import com.dev.abiliolanches.entity.Employee;

import java.util.List;

public interface EmployeeService {

    List<Employee> findAll();
    Employee findById(int id);
    List<Employee> findByFNameLike(String fname);
    void save(Employee employee);
    void deleteById(int id);
}
