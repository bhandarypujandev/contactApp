package com.contact.contactapp.data;

import com.contact.contactapp.entity.Contact;
import com.contact.contactapp.repo.ContactRepo;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ContactLoader implements ApplicationRunner {
    private final ContactRepo contactRepo;

    public ContactLoader(ContactRepo contactRepo) {
        this.contactRepo = contactRepo;
    }

    //Insert few contacts as application loads
    @Override
    public void run(ApplicationArguments args) {
        List<Contact> contacts = new ArrayList<>();
        contacts.add(new Contact(1l, "Pujan Lama", "abc@gdd.com", "123456789098"));
        contacts.add(new Contact(2l, "dsa das", "das@nv.com", "123456789097"));
        contacts.add(new Contact(3l, "John Doe", "john@gmail.com", "123456789096"));
        contacts.add(new Contact(4l, "Jane Doe", "doe@gmail.com", "123456789095"));
        contacts.add(new Contact(5l, "Pujan Lam", "ac@gdd.com", "123456789018"));
        contacts.add(new Contact(6l, "ds das", "da@nv.com", "123456789027"));
        contacts.add(new Contact(7l, "Jon Doe", "jn@gmail.com", "123456789036"));
        contacts.add(new Contact(8l, "Jane Doe", "do@gmail.com", "123456789045"));
        contacts.add(new Contact(9l, "test 1", "test1@gmail.com", "123456789054"));
        contacts.add(new Contact(10l, "test 2", "test2@gmail.com,", "123456789063"));
        contacts.add(new Contact(11l, "test 3", "test3@gmail.com", "123456789072"));
        contacts.add(new Contact(12l, "test 4", "test4@gmail.com", "123456789081"));

        contactRepo.saveAll(contacts);






    }
}

