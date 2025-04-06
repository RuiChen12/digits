/* eslint-disable react/prop-types */

'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation'; // ✅
import swal from 'sweetalert';
import { addNote } from '@/lib/dbActions';
import { AddNoteSchema } from '@/lib/validationSchemas';

interface Props {
  contactId: number;
}

const AddNoteForm: React.FC<Props> = ({ contactId }) => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email || '';
  const router = useRouter(); // ✅

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddNoteSchema),
    defaultValues: {
      note: '',
      contactId,
      owner: currentUser,
    },
  });

  const onSubmit = async (data: any) => {
    await addNote(data);
    reset();
    router.refresh();
    swal('Success', 'Note added!', 'success', { timer: 1200 });
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Note</Form.Label>
            <textarea
              rows={3}
              {...register('note')}
              className={`form-control ${errors.note ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.note?.message}</div>
          </Form.Group>

          {/* hidden fields */}
          <input type="hidden" {...register('contactId')} value={contactId} />
          <input type="hidden" {...register('owner')} value={currentUser} />

          <Row className="pt-3">
            <Col>
              <Button type="submit" variant="primary">Submit</Button>
            </Col>
            <Col>
              <Button type="button" variant="secondary" onClick={() => reset()}>
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddNoteForm;
