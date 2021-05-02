package com.kjsp.calendar.repository;

import com.kjsp.calendar.entity.UserInfo;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserInfo, Long> {
  Optional<UserInfo> findByEmail(String email);
}
