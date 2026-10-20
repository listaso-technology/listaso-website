import { Icon } from "@/components/icons/Icon";
import { Container } from "@/components/layout/Container";
import { board, compare, type Availability } from "@/content/pricing/plans";
import { cx } from "@/lib/utils/cx";
import { ProductSection } from "../product/ProductSection";
import { DossierHeader } from "../variants/DossierHeader";
import dossier from "../variants/dossier.module.css";

function Mark({ value }: { value: Availability }) {
  if (value === "y") {
    return (
      <>
        <Icon name="check" size={20} className="mx-auto text-icon-accent" />
        <span className="sr-only">{compare.included}</span>
      </>
    );
  }
  if (value === "o") {
    return <span className="text-small font-semibold text-fg-accent">{compare.optional}</span>;
  }
  return (
    <>
      <span aria-hidden="true" className="text-body text-fg-muted">
        —
      </span>
      <span className="sr-only">{compare.notIncluded}</span>
    </>
  );
}

/**
 * Plan comparison (start-version COMPARE): one semantic table with a group
 * header per app. On desktop the plan header sticks under the site header;
 * on small screens the table scrolls sideways with the feature column fixed.
 */
export function CompareTable() {
  const titleId = `${compare.id}-title`;
  const stickyHead = "lg:sticky lg:top-[calc(4.5rem+1px)] lg:z-10";

  return (
    <ProductSection labelledBy={titleId} id={compare.id} tone="alt" className="scroll-mt-20">
      <Container width="wide" className="flex flex-col gap-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <DossierHeader id={titleId} eyebrow={compare.eyebrow} title={compare.title} />
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small text-fg-muted">
            <li className="flex items-center gap-2">
              <Icon name="check" size={20} className="text-icon-accent" />
              {compare.included}
            </li>
            <li className="flex items-center gap-2">
              <span aria-hidden="true">—</span>
              {compare.notIncluded}
            </li>
            <li className="flex items-center gap-2">
              <span className="font-semibold text-fg-accent">{compare.optional}</span>
            </li>
          </ul>
        </div>

        <div
          role="region"
          aria-labelledby={titleId}
          tabIndex={0}
          className="relative overflow-x-auto border-2 border-fg-heading bg-surface-page focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus lg:overflow-visible"
        >
          <table className="w-full min-w-[34rem] border-collapse text-left">
            <caption className="sr-only">
              {compare.title.emphasis} {compare.title.rest}
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className={cx(
                    stickyHead,
                    "sticky left-0 z-20 w-[38%] border-b-2 border-fg-heading bg-surface-page px-4 py-4 text-small font-bold tracking-widest text-fg-muted uppercase sm:px-6",
                  )}
                >
                  {compare.featureLabel}
                </th>
                {compare.columns.map((column, index) => (
                  <th
                    key={column.name}
                    scope="col"
                    className={cx(
                      stickyHead,
                      "border-b-2 border-fg-heading bg-surface-page px-3 py-4 text-center",
                      board.plans[index]?.featured && "shadow-[inset_0_4px_0_var(--listaso-action-primary)]",
                    )}
                  >
                    <span className="block text-small font-bold tracking-wide text-fg-heading uppercase">{column.name}</span>
                    <span className="block text-small text-fg-muted">{column.price}</span>
                  </th>
                ))}
              </tr>
            </thead>
            {compare.groups.map((group) => (
              <tbody key={group.group}>
                <tr>
                  <th
                    scope="rowgroup"
                    colSpan={compare.columns.length + 1}
                    className="border-t-2 border-fg-heading bg-surface-soft px-4 py-3 text-left sm:px-6"
                  >
                    <span className={cx(dossier.bracket, "sticky left-4 text-small font-bold tracking-widest text-fg-heading uppercase")}>
                      {group.group}
                    </span>
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.feature} className="border-t border-line-subtle">
                    <th
                      scope="row"
                      className="sticky left-0 z-[1] bg-surface-page px-4 py-3 text-body font-normal text-fg-default sm:px-6"
                    >
                      {row.feature}
                    </th>
                    {row.plans.map((value, index) => (
                      <td key={compare.columns[index].name} className="px-3 py-3 text-center">
                        <Mark value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </Container>
    </ProductSection>
  );
}
