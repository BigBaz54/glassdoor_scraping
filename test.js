async function getPageText(url) {
    const text = await fetch(url, {
        "headers": {
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
          "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
          "cache-control": "max-age=0",
          "sec-ch-ua": "\"Opera GX\";v=\"99\", \"Chromium\";v=\"113\", \"Not-A.Brand\";v=\"24\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "none",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1"
        },
        "referrer": "https://www.google.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
      }).then(response => response.text());
    return text;
}

function buildUrl(job, page = 1) {
  job = job.replace(/ /g, "-");
  const endPos = job.length + 6;
  return "https://www.glassdoor.com/Interview/nancy-" + job + "-interview-questions-SRCH_IL.0,5_IC2954424_KO6,"+ endPos +"_SDMC_IP" + page + ".htm";
}

function getQuestionsFromText(text) {
  const questions = text.split('<h3 class="css-1jvs3tk edupdmz3">');
  questions.shift();
  const formattedQuestions = questions.map(q => {
    const question = q.split('</h3>')[0];
    return question;
  });
  return formattedQuestions;
}

function getQuestionsByJob(job, nb_questions = 100) {
  // writes the questions in a file
  let page = 1;
  let question_number = 0;
  const fs = require('fs');
  const stream = fs.createWriteStream("questions_" + job + ".txt");
  stream.once('open', async function(fd) {
    while (question_number < nb_questions) {
      let t = await getPageText(buildUrl(job, page))
      t = t.replace(/&quot;/g, '"');
      t = t.replace(/&amp;/g, '&');
      t = t.replace(/&lt;/g, '<');
      t = t.replace(/&gt;/g, '>');
      t = t.replace(/&#x27;/g, '\'');
      const questions = getQuestionsFromText(t);
      questions.forEach(q => stream.write(q + "\n-----------------\n"));
      if (questions.length !== 0) {
        page++;
        question_number += questions.length;
      }
    }
  });
}

getQuestionsByJob("financial analyst", 1000);