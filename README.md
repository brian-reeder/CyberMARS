# CyberMARS - Modular Artifact Report Structure
CyberMARS is a static web application designed to assist Cyber Security professionals in designing structured templates for parsing event logs. These templates can be used for writing incident reports, SIEM queries, or other notes.

The application is built using React and Next.js frameworks, allowing for a smooth and responsive user experience. The template state is stored in the browser fragment, providing the added benefit of being able to bookmark templates or share links to them without sending sensitive information to an unmanaged server.

## Features
User-friendly interface for designing templates
Ability to parse event logs using the created templates
Store template state in browser fragment for added security
Share templates or bookmark them for future use

## Getting Started
The project is located at https://brian-reeder.github.io/CyberMARS/ . Access the application and start designing your templates.

Use the following syntaxt in the report template to reference fields in the artifact container:

${A.01.FieldName}

Where:
 1. A is the Artifact ID
 2. 01 is the Element ID
 3. FieldName is the name of the field parsed in the Artifact Element.

## Contribution
We welcome contributions to the project. If you have any suggestions or find any bugs, please open an issue or submit a pull request.

## Support
If you need any assistance or have any questions, please open an issue and we will be happy to help.

## License
This project is licensed under the MIT License.

Enjoy using CyberMARS and happy parsing!
