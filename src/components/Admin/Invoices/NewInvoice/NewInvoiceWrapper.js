import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLoader from 'components/Shared/Utils/PageLoader';
import NewInvoice from 'components/Admin/Invoices/NewInvoice/NewInvoice';
import { getProject, getUninvoicedTimeEntries } from 'services/admin/projects';
import { timeEntriesToInvoiceItems } from 'utils/contracts';
import { SnackbarContext } from 'context/snackbarContext';

function NewInvoiceWrapper() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [initialInvoiceItems, setInitialInvoiceItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useContext(SnackbarContext);

  const fetchProject = async () => {
    try {
      const projectResponse = await getProject(projectId);
      setProject(projectResponse.data);
      if (projectResponse.data.client_type_of_billing === 'custom_type') {
        setInitialInvoiceItems([
          {
            title: projectResponse.data.title,
            quantity: 1,
            price: projectResponse.data.client_payment_amount,
          },
        ]);
      } else {
        const uninvoicedTimeEntriesResponse = await getUninvoicedTimeEntries(projectId);
        const invoiceItems = timeEntriesToInvoiceItems(uninvoicedTimeEntriesResponse.data, projectResponse.data);
        setInitialInvoiceItems(invoiceItems);
      }
      setLoading(false);
    } catch (error) {
      showSnackbar('Something went wrong', 'error');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line
  }, []);

  return loading ? <PageLoader /> : <NewInvoice project={project} initialInvoiceItems={initialInvoiceItems} />;
}

export default NewInvoiceWrapper;
