package com.contact.contactapp.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(indexes = {
    @Index(name = "full_name_index", columnList = "full_name"),
    @Index(name = "mobile_number_index", columnList = "mobile_number", unique = true)
})
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="full_name",length = 80)
    private String fullName;
    @Column(name = "email_address")
    private String emailAddress;
    @Column(name = "mobile_number")
    private String mobileNumber;

    @Override
    public String toString() {
        return "Contact{" +
            "id=" + id +
            ", fullName='" + fullName + '\'' +
            ", emailAddress='" + emailAddress + '\'' +
            ", mobileNumber='" + mobileNumber + '\'' +
            '}';
    }
}
