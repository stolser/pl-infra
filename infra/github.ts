import * as github from "@pulumi/github";

const githubActionsRepo = new github.Repository("github-actions", {
    description: "Monorepo for custom GitHub Actions",
    visibility: "public",
    topics: ["monorepo", "github-actions"],
    allowSquashMerge: true,
    allowRebaseMerge: false,
    allowMergeCommit: false,
    allowAutoMerge: false
});
