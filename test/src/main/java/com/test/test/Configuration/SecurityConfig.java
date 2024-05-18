package com.test.test.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.test.test.Filter.JwtAuthenticationFilter;
import com.test.test.Service.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

		SecurityFilterChain sc = http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        req->req.requestMatchers("/jwt/login**","/jwt/register**", "/OTPSend/**","/OTPVerify/**",
//                        		for testing Admin
                        		"/jwt/admin-register**", "/jwt/admin-login",
                        		// for Employee
                        		"/jwt/employee-register**", "/jwt/employee-login**", "/jwt/**"
//                        		//to delete
                        		,"/photos/upload**", "/photos**", "/photos/get-photo-by-name/**", "/applicants/**"
                        		, "/photos/get-photo-by-username/**"
                        		,"vehicles/create**","vehicles/update**", "vehicles/find-by-username/**"
                        		,"/logs/add**","/logs/all**", "/logs/**"
                        		,"/applicants/**"
                        		,"/parking/**"
                        		,"/config/**"
                        		,"/forget-password/**"
                        		,"/prices/**"
                        		,"/applicants/**"
                        		)
//                       
                                .permitAll()
                                .anyRequest()
                                .authenticated()
                ).userDetailsService(userService)
                .sessionManagement(session->session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(
                        e->e.accessDeniedHandler(
                                        (request, response, accessDeniedException)->response.setStatus(403)
                                )
                                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                .build();
        
		System.out.print(sc);
        return sc;
    }
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    } 
	
}
