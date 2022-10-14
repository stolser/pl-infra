import * as github from "@pulumi/github";
import {BranchDefault, BranchProtection} from "@pulumi/github";

let mainBranchName = "master";

export function createGitHubRepos() {

    function newPublicRepository(repoName: string,
                                 repoDescription: string,
                                 repoTopics: Array<string>) {

        return new github.Repository(repoName, {
            name: repoName,
            description: repoDescription,
            visibility: "public",
            topics: repoTopics,
            allowSquashMerge: true,
            allowRebaseMerge: false,
            allowMergeCommit: false,
            allowAutoMerge: false,
            deleteBranchOnMerge: true
        });
    }

    const githubActionsRepo = newPublicRepository(
        "github-actions",
        "Monorepo for custom GitHub Actions",
        ["node", "monorepo", "github-actions"]
    );

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

    const graphQlRepo = newPublicRepository(
        "graphql-book-list",
        "A simple web app built with Node.js, GraphQL, Express, MongoDB, React, and Apollo",
        ["node", "graphql", "express", "mongodb", "react", "apollo"]
    );
}
