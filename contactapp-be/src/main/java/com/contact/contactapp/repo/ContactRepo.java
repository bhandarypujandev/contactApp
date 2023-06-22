package com.contact.contactapp.repo;

import com.contact.contactapp.controller.ContactController;
import com.contact.contactapp.entity.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface ContactRepo extends PagingAndSortingRepository<Contact, Long> {

    Page<Contact> findByFullNameLike(String name, Pageable pageable);

    @Query("select case when count(c)> 0 then true else false end from Contact c where c.mobileNumber = ?1")
    boolean existByPhoneNumber(String mobileNumber);

    @Query("select case when count(c)> 0 then true else false end from Contact c where c.mobileNumber = ?1 and c.id <> ?2")
    boolean isMobileNumberExitForOtherId(String mobileNumber, Long id);
}
