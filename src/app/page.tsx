/**
 * Landing page. Step 1 (scaffold) placeholder: sections are built in step 2.
 * The component sheet lives at /components.
 */
export default function Home() {
  return (
    <main style={{ padding: '96px var(--page-margin)', maxWidth: 1200, margin: '0 auto' }}>
      <p className="t-eyebrow">UAE → India business payments</p>
      <h1 className="t-display" style={{ marginTop: 24 }}>
        Same sea.
        <br />
        Better paperwork.
      </h1>
      <p className="t-lead" style={{ marginTop: 24 }}>
        Scaffold only. Review the base components at <a href="/components">/components</a>.
      </p>
    </main>
  );
}
