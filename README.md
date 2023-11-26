# Glassdoor scraping

OUTDATED: URL format has been modified.

This project is a web scraping tool that extracts interview questions from Glassdoor. It allows users to scrape interview questions for specific jobs or from specific employers and save them to a file for further analysis or reference.

## Installation

1. Clone the repository:

   ```shell
        git clone https://github.com/BigBaz54/glassdoor_scraping.git
    ```

2. Navigate to the project directory:

   ```shell
        cd glassdoor_scraping
   ```

## Usage

- To scrape interview questions for a specific job:
    
    ```shell
        node scraping.js getQuestionsByJob "job-title" [number-of-questions]
    ```
    Replace "job-title" with the desired job title, e.g., "financial analyst". Optionally, specify the number of questions to scrape (default: 100).

- To scrape interview questions for a specific employer:
        
    ```shell
        node scraping.js getQuestionsByEmployer "employer-name" [number-of-questions] [job-filter]
    ```
    Replace "employer-name" with the desired employer name, e.g., "goldman sachs". Optionally, specify the number of questions to scrape (default: 100) and a job filter to narrow down the questions. Please note that the job filter must be a valid job title for the specified employer : you can find popular job titles for a specific employer on their Glassdoor page.

Scraped questions will be saved in a text file named "questions_{job/employer}_{job-filter?}.txt" in the project directory.
