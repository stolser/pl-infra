import * as github from "@pulumi/github";
import {BranchDefault, BranchProtection} from "@pulumi/github";

let mainBranchName = "master";

export function createGitHubRepos() {
    const githubActionsRepo = new github.Repository("github-actions", {
        name: "github-actions",
        description: "Monorepo for custom GitHub Actions",
        visibility: "public",
        topics: ["node", "monorepo", "github-actions"],
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

    const graphQLRepo = new github.Repository("graphql-book-list", {
        name: "graphql-book-list",
        description: "A simple web app built with Node.js, GraphQL, Express, MongoDB, React, and Apollo",
        visibility: "public",
        topics: ["node", "graphql", "express", "mongodb", "react", "apollo"],
        allowSquashMerge: true,
        allowRebaseMerge: false,
        allowMergeCommit: false,
        allowAutoMerge: false
    });
}
