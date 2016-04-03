package com.github.nikit.cpp;

import org.apache.commons.io.FileUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;

/**
 * Created by Nikita on 25.03.2016.
 */
@RestController
public class IndexController {
    @RequestMapping(path ="/users", method = RequestMethod.GET, produces = "application/json")
    public String sendEmail() throws IOException {
        return FileUtils.readFileToString(new File("src/main/webapp/response.json"));
    }
}
