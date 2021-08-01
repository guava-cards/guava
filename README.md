# Guava

An online spaced-repition learning platform 📚

## Structure

| Codebase                       |      Description     |
|--------------------------------|:--------------------:|
| [app](./app/README.md)         |  Vite/React Web App  |
| [backend](./backend/README.md) |     Rails Backend    |
| [library](./library/README.md) | Shared frontend code |
| [native](./native/README.md)   |   React Native App   |
| [desktop](./desktop/README.md) |     Electron App     |
## Branches

| Branch    |         Description         |
|-----------|:---------------------------:|
| main      | Master Branch -> Production |
| develop   |  Develop Branch -> Staging  |
| feature/* |       Feature branches      |
| bugfix/*  |       Bug fix branches      |
| hotfix/*  |       Hotfix branches       |

__Git workflow__

Helps keep the working tree clean 🙏🏽. [Learn more here](https://www.atlassian.com/git/tutorials/comparing-workflows)

## Deployments

These are handed using Github Actions.
The web app is deployed to Vercel, and the backend to Heroku

__Domains__

|                       Domain                       |               Description               |
|:--------------------------------------------------:|:---------------------------------------:|
|             [guava.cards](guava.cards)             |           Production Frontend           |
|     [staging.guava.cards](staging.guava.cards)     |  Staging Frontend (Password Protected)  |
|         [api.guava.cards](api.guava.cards)         |              Production API             |
| [staging-api.guava.cards](staging-api.guava.cards) | Staging API (HTTP Basic Authentication) |

## License

This codebase is licensed under [GNU Affero General Public License v3](./LICENSE).

What this permits you to do is:
- Use the software for commerical purposes
- Modify the software and create derivates
- Distribute original or derivate copies of the software

In doing so you *must*:
- Include a copyright notice (&copy; Jesse Onolememen, Guava Cards LTD 2021. All Rights Reserved)
- Include the full text license in the modified software
- State changes made to the sofware
- Diclose your source code when you distribute, publish or serve modified or derviate versions of the software

What this *does not* permit you to do:
- Sublicense
  