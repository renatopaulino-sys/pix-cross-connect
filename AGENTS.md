<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep all public homepage copy centralized in the bilingual content models so locale switches never produce partial sections.
- Company, pricing, method status and iGaming data live only in src/data/{company,pricing,methods,igaming}.ts; legal/page copy in src/data/pages.ts — so business changes are one-line edits.
- Every route head() uses seo() from src/lib/seo.ts — keeps canonical, OG and hreflang consistent.
