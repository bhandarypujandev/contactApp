package com.contact.contactapp.controller;

import com.contact.contactapp.dto.ContactDto;
import com.contact.contactapp.dto.PageableResponse;
import com.contact.contactapp.entity.Contact;
import com.contact.contactapp.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactService contactService;

    @GetMapping("/all")
    public ResponseEntity<PageableResponse<Contact>> getAll(@RequestParam(defaultValue = "0") int pageNumber) {
        Page<Contact> all = contactService.findAll(pageNumber);
        return ResponseEntity.status(HttpStatus.OK).body(
            PageableResponse.<Contact>builder()
                .totalElement(all.getTotalElements())
                .totalPage(all.getTotalPages())
                .last(all.isLast())
                .size(all.getSize())
                .content(all.getContent())
                .build());
    }

    @GetMapping("/search")
    public ResponseEntity<PageableResponse<Contact>> getAllByName(@RequestParam(defaultValue = "0") int pageNumber, @RequestParam(defaultValue = "") String fullName) {
        Page<Contact> all = contactService.findAll(pageNumber, fullName);
        return ResponseEntity.status(HttpStatus.OK).body(PageableResponse.<Contact>builder()
                .totalElement(all.getTotalElements())
                .totalPage(all.getTotalPages())
                .last(all.isLast())
                .size(all.getSize())
                .content(all.getContent())
                .build()
            );
    }


    @PostMapping
    public ResponseEntity<Contact> save(@Valid @RequestBody ContactDto contact) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.save(contact));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> update(@PathVariable Long id, @Valid @RequestBody ContactDto contactRequest) {

        return ResponseEntity.status(HttpStatus.OK).body(contactService.update(contactRequest, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        contactService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
