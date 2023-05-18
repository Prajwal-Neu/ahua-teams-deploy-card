# Ahua MS Teams Notification action

This action sends a notification on MS Teams channel.

To learn how this action was built, see "[Creating a JavaScript action](https://help.github.com/en/articles/creating-a-javascript-action)" in the GitHub Help documentation.

## Example usage

```yaml
uses: Prajwal-Neu/ahua-teams-deploy-card@main
with:
  environment: "Staging" or "Production"
  teams-webhook-url: ${{secrets.TEAMS_WEBHOOK_URL}}
  status: "Failure" or "Success"
  storybook-url: "Storybook URL"
```
