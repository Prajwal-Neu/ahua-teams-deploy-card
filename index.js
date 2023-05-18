const core = require("@actions/core");
const github = require("@actions/github");
const fetch = require("node-fetch");

async function run() {
  try {
    const environment = core.getInput("environment");
    const status = core.getInput("status");
    const teams_webhook_url = core.getInput("teams-webhook-url");
    const storybook_url = core.getInput("storybook-url");

    const time = new Date().toUTCString();
    const repo_owner = github.context.repo.owner;
    const repo_name = github.context.repo.repo;

    const payload = {
      "@type": "MessageCard",
      "@context": "http://schema.org/extensions",
      themeColor: status === "Failure" ? "D70000" : "00D700",
      summary: "Ahua Release",
      sections: [
        {
          facts: [
            {
              name: "Environment",
              value: environment,
            },
            {
              name: "Date",
              value: time,
            },
            {
              name: "Status",
              value: status,
            },
          ],
          markdown: true,
        },
      ],
      potentialAction: [
        {
          "@type": "OpenUri",
          name: "View Packages",
          targets: [
            {
              os: "default",
              uri: `https://github.com/orgs/${repo_owner}/packages?repo_name=${repo_name}`,
            },
          ],
        },
        {
          "@type": "OpenUri",
          name: "View Release",
          targets: [
            {
              os: "default",
              uri: `https://github.com/${repo_owner}/${repo_name}/actions`,
            },
          ],
        },
        {
          "@type": "OpenUri",
          name: "View Storybook",
          targets: [
            {
              os: "default",
              uri: storybook_url,
            },
          ],
        },
      ],
    };

    const response = await fetch(teams_webhook_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status !== 200) {
      core.setFailed("Failed");
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
