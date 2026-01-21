let toastifyPromise: Promise<typeof import("react-toastify")> | null = null;

function ensureProviderMounted() {
  // Mark toasts as enabled (handles race conditions)
  if (typeof window !== "undefined") {
    window.__toastsEnabled = true;
    window.__enableToasts?.();
  }
}

async function getToastify() {
  if (!toastifyPromise) {
    toastifyPromise = import("react-toastify");
  }
  return toastifyPromise;
}

async function nextTick() {
  await new Promise((r) => setTimeout(r, 0));
}

export async function notifySuccess(message: string) {
  ensureProviderMounted();
  await nextTick(); // give provider time to mount ToastContainer
  const { toast } = await getToastify();
  toast.success(message);
}

export async function notifyError(message: string) {
  ensureProviderMounted();
  await nextTick();
  const { toast } = await getToastify();
  toast.error(message);
}

export async function notifyInfo(message: string) {
  ensureProviderMounted();
  await nextTick();
  const { toast } = await getToastify();
  toast(message);
}

