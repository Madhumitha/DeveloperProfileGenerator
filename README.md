# DeveloperProfileGenerator

## User Stories 

````
AS A product manager

I WANT a developer profile generator

SO THAT I can easily prepare reports for stakeholders
````

## Business Context 

When preparing a report for stakeholders, it is important to have up-to-date information about members of the development team. Rather than navigating to each team's Github profile, a command-line application will allow for quick and easy generation of profiles in PDF format.

## Project Description 

The application generates a PDF resume from the user provided GitHub profile.   
- The generated resume includes a bio image from the user's github profile. 
- The generated resume includes the user's location and a link to their github profile. 
- The generated resume includes the number of: public repositories, followers, Github stars and following count. 
- The background color of the generated PDF matches the color that the user provides.

```
GIVEN the developer had a GitHub profile

WHEN prompted for the developer's Github username and favorite color

THEN a PDF profile is generated
```



