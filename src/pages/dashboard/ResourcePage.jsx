import { useMemo, useState } from "react";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useAppData } from "../../contexts/AppDataContext";
import { useNotifications } from "../../contexts/NotificationContext";
import { resourceConfigs } from "../../config/resourceConfigs";
import { hasPermission } from "../../utils/permissions";
import { validateRecord } from "../../utils/validation";
import { DataTable } from "../../components/ui/DataTable";
import { Modal } from "../../components/ui/Modal";
import { PageHeader } from "../../components/ui/PageHeader";

export default function ResourcePage({ resource }) {
  const config = resourceConfigs[resource];
  const { state, dispatch } = useAppData();
  const { user } = useAuth();
  const { showNotification } = useNotifications();
  const [dialog, setDialog] = useState(null);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const rows = state[resource];

  const canCreate = hasPermission(user, `${config.permission}:create`) || user.role === "Admin";
  const canUpdate = hasPermission(user, `${config.permission}:update`) || user.role === "Admin";
  const canDelete = hasPermission(user, `${config.permission}:delete`) || user.role === "Admin";
  const defaultValues = useMemo(() => Object.fromEntries(config.fields.map((field) => [field.key, field.type === "number" ? 0 : field.options?.[0] || ""])), [config.fields]);

  function openForm(record = null) {
    setValues(record ? { ...record } : defaultValues);
    setErrors({});
    setDialog(record ? { type: "edit", record } : { type: "create" });
  }

  function saveRecord(event) {
    event.preventDefault();
    const validationErrors = validateRecord(config.fields, values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;
    const normalized = Object.fromEntries(config.fields.map((field) => [field.key, field.type === "number" ? Number(values[field.key]) : values[field.key]]));
    if (dialog.type === "create") {
      dispatch({ type: "CREATE_RESOURCE", resource, record: { ...normalized, id: crypto.randomUUID() } });
      showNotification({ type: "success", message: `${config.singular} created successfully.` });
    } else {
      dispatch({ type: "UPDATE_RESOURCE", resource, record: { ...dialog.record, ...normalized } });
      showNotification({ type: "success", message: `${config.singular} updated successfully.` });
    }
    setDialog(null);
  }

  function deleteRecord() {
    dispatch({ type: "DELETE_RESOURCE", resource, id: dialog.record.id });
    showNotification({ type: "success", message: `${config.singular} deleted.` });
    setDialog(null);
  }

  return (
    <div className="page-stack">
      <PageHeader eyebrow="Data management" title={config.title} description={config.description} action={canCreate && <button className="button button-primary" type="button" onClick={() => openForm()}><Plus size={17} /> Add {config.singular.toLowerCase()}</button>} />
      <DataTable rows={rows} columns={config.columns} filters={config.filters} searchPlaceholder={`Search ${config.title.toLowerCase()}…`} actions={(record) => <>
        <button className="table-action" type="button" onClick={() => setDialog({ type: "view", record })} aria-label={`View ${record.name}`}><Eye size={16} /></button>
        {canUpdate && <button className="table-action" type="button" onClick={() => openForm(record)} aria-label={`Edit ${record.name}`}><Pencil size={16} /></button>}
        {canDelete && <button className="table-action table-action-danger" type="button" onClick={() => setDialog({ type: "delete", record })} aria-label={`Delete ${record.name}`}><Trash2 size={16} /></button>}
      </>} />

      <Modal open={dialog?.type === "create" || dialog?.type === "edit"} onClose={() => setDialog(null)} title={`${dialog?.type === "edit" ? "Edit" : "Add"} ${config.singular.toLowerCase()}`} description="Fields marked required are validated before saving.">
        <form className="resource-form" onSubmit={saveRecord} noValidate>
          <div className="form-grid">{config.fields.map((field) => <label className={field.type === "textarea" ? "full-width" : ""} key={field.key}><span>{field.label}</span>{field.type === "select" ? <select value={values[field.key] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))}>{field.options.map((option) => <option key={option}>{option}</option>)}</select> : field.type === "textarea" ? <textarea rows="3" value={values[field.key] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} /> : <input type={field.type || "text"} value={values[field.key] ?? ""} onChange={(event) => setValues((current) => ({ ...current, [field.key]: event.target.value }))} />}{errors[field.key] && <small className="field-error">{errors[field.key]}</small>}</label>)}</div>
          <div className="form-actions"><button className="button button-ghost" type="button" onClick={() => setDialog(null)}>Cancel</button><button className="button button-primary" type="submit">Save {config.singular.toLowerCase()}</button></div>
        </form>
      </Modal>

      <Modal open={dialog?.type === "view"} onClose={() => setDialog(null)} title={`${config.singular} details`}>
        <dl className="detail-list">{dialog?.record && config.fields.map((field) => <div key={field.key}><dt>{field.label}</dt><dd>{dialog.record[field.key]}</dd></div>)}</dl>
      </Modal>
      <Modal open={dialog?.type === "delete"} onClose={() => setDialog(null)} title={`Delete ${config.singular.toLowerCase()}?`} description="This change is applied to the local demo data." confirmLabel="Delete" confirmTone="danger" onConfirm={deleteRecord}>
        <p><strong>{dialog?.record?.name}</strong> will be removed. This demonstrates the reusable confirmation mode.</p>
      </Modal>
    </div>
  );
}
