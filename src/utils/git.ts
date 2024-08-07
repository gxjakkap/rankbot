import { Client } from 'discord.js'
import Git from 'nodegit'

const originBranch = 'origin/main'

export const countCommits = async () => {
    const repo = await Git.Repository.open('.')
  
    const [branch1Commit, branch2Commit] = await Promise.all([
      repo.getReferenceCommit(await (repo.head())),
      repo.getReferenceCommit(originBranch)
    ])
  
    const mergeBaseOid = await Git.Merge.base(repo, branch1Commit.id(), branch2Commit.id())
  
    const mergeBaseCommit = await repo.getCommit(mergeBaseOid)
  
    const revWalkLeft = repo.createRevWalk()
    const revWalkRight = repo.createRevWalk()
  
    revWalkLeft.push(branch1Commit.id())
    revWalkLeft.hide(mergeBaseOid)
  
    revWalkRight.push(branch2Commit.id())
    revWalkRight.hide(mergeBaseOid)
  
    const leftCommits = await revWalkLeft.getCommitsUntil(() => true)
    const rightCommits = await revWalkRight.getCommitsUntil(() => true)
    return [leftCommits.length, rightCommits.length]
}

export const printCommitDiff = (diff: number[], addTimeStamp: boolean) => {
    const now = new Date()
    if (diff[0] > diff[1]){
        const x = diff[0] - diff[1]
        console.log(`${addTimeStamp ? `[${now.toISOString()}]` : ""}[DIFF] You're currently ${x} commit${(x > 1) ? "s" : ""} ahead of ${originBranch} \n`)
    }
    else if (diff[0] < diff[1]){
        const x = diff[1] - diff[0]
        console.log(`${addTimeStamp ? `[${now.toISOString()}]` : ""}[DIFF] You're currently ${x} commit${(x > 1) ? "s" : ""} behind ${originBranch}`)
        console.log(`${addTimeStamp ? `[${now.toISOString()}]` : ""}[DIFF] Update via git using "git pull" \n`)
    }
    else {
        console.log(`${addTimeStamp ? `[${now.toISOString()}]` : ""}[DIFF] You're up to date with ${originBranch} \n`)
    }
}
  

export const checkCurrentRepoStatus = async () => {
    const repo = await Git.Repository.open('.')
    const commit = await repo.getHeadCommit()
    await repo.fetch('origin')
    const diff = await countCommits()
    console.log(`[READY] Running on commit: ${commit.sha()}`)
    console.log(`[READY] Committer: ${commit.committer()}`)
    console.log(`[READY] Commit Message: ${commit.message()}`)
    printCommitDiff(diff, false)
    return commit
}

export const getCurrentVersion = async () => {
    const repo = await Git.Repository.open('.')
    const commit = await repo.getHeadCommit()
    await repo.fetch('origin')
    const diff = await countCommits()
    return {
        commit,
        diff
    }
}