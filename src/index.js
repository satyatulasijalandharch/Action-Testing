const { info, setFailed, setOutput, getInput } = require('@actions/core')
const github = require('@actions/github')
const { Octokit } = require('@octokit/rest')
/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const githubToken = getInput('GITHUB_TOKEN', { required: true })
    const octokit = new Octokit({ auth: githubToken });

    const workflowRun = await octokit.rest.actions.getWorkflowRun({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      run_id: github.context.runId
    });

    const WorkflowRun = workflowRun.data;
    const commitMessage = WorkflowRun.head_repository.html_url+"/commit/"+WorkflowRun.head_sha

    // console.log("Workflow Run Data:", WorkflowRun)
    console.log("Workflow Name:", WorkflowRun.name)
    console.log("Event:", WorkflowRun.event.toUpperCase())
    console.log("Status:", WorkflowRun.status.toUpperCase())
    console.log("Run Number:", WorkflowRun.run_number)
    console.log("Avatar URL:", WorkflowRun.actor.avatar_url)
    console.log("Author:", WorkflowRun.head_commit.author.name)
    console.log("Repository Name:", WorkflowRun.head_repository.full_name)
    console.log("Review Commit URL:", commitMessage)
    console.log("Commit Message:", WorkflowRun.head_commit.message)

    setOutput('CommitMessage', commitMessage)
    return commitMessage
  } catch (error) {
    setFailed(error.message)
  }
}

module.exports = {
  run
}
