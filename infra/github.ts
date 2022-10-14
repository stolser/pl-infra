import {Repository} from "@pulumi/github";
import * as github from "./utils/github-utils"

export function createGitHubRepos() {

    /**
     * Create repo 'github-actions'
     */
    function createGitHubActionsRepo() {
        const githubActionsRepo: Repository = github.newPublicRepository(
            "github-actions",
            "Monorepo for custom GitHub Actions",
            ["node", "monorepo", "github-actions"]
        );

        github.createDefaultBranch("ga-repo-default-branch", githubActionsRepo)
        github.createBranchProtection("ga-repo-branch-protection", githubActionsRepo)
    }

    /**
     * Create repo 'graphql-book-list'
     */
    function createGraphQlBookListRepo() {
        const graphQlRepo = github.newPublicRepository(
            "graphql-book-list",
            "A simple web app built with Node.js, GraphQL, Express, MongoDB, React, and Apollo",
            ["node", "graphql", "express", "mongodb", "react", "apollo"]
        );

        github.createDefaultBranch("book-list-repo-default-branch", graphQlRepo)
        github.createBranchProtection("book-list-repo-branch-protection", graphQlRepo)
    }


    // Create GitHub repositories

    createGitHubActionsRepo();

    createGraphQlBookListRepo();
}
