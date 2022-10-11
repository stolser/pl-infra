import * as github from "@pulumi/github";
import {BranchDefault, BranchProtection} from "@pulumi/github";

let mainBranchName = "master";

export function createGitHubRepos() {
    const githubActionsRepo = new github.Repository("github-actions", {
        name: "github-actions",
        description: "Monorepo for custom GitHub Actions",
        visibility: "public",
        topics: ["monorepo", "github-actions"],
        allowSquashMerge: true,
        allowRebaseMerge: false,
        allowMergeCommit: false,
        allowAutoMerge: false
    });

    new BranchDefault("ga-repo-default-branch", {
        branch: mainBranchName,
        repository: githubActionsRepo.name
    });

    new BranchProtection("ga-repo-branch-protection", {
        pattern: mainBranchName,
        repositoryId: githubActionsRepo.name,
        allowsForcePushes: false,
        enforceAdmins: true,
        requireConversationResolution: true,
        requireSignedCommits: true
    })
}
