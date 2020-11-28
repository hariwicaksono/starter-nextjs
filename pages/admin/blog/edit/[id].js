import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../../../../components/layout';
import API from '../../../../libs/axios';
import { ImagesUrl } from '../../../../libs/urls';
import {Container, Breadcrumb, Card, Row, Col, Spinner, Button, Form} from 'react-bootstrap';
import { FaSave, FaTrash, FaPencilAlt} from 'react-icons/fa';
import {toast} from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  title: yup.string().required(),
  date: yup.string().required(),
  time: yup.string().required(),
  summary: yup.string().required(),
  body: yup.string().required()
}); 

class Edit extends Component {
  constructor(props){
    super(props)
    this.state = {
        id: '',
        title: '',
        body: '',
        image: '',
        date: '',
        time: '',
        category: [],
        category_id: '',
        url: ImagesUrl(),
        loading: true
        
    }
} 
static async getInitialProps ({ query }) {
  const id = query.id
  return {
    id: id
  }
}

  componentDidMount = () => {
    const id = this.props.id
        API.GetBlogId(id).then(res=>{
          console.log(res)
            this.setState({
                id: res.data[0].id,
                category_id: res.data[0].category,
                title : res.data[0].title,
                summary: res.data[0].summary,
                body: res.data[0].body,
                image: res.data[0].post_image,
                date: res.data[0].date,
                time: res.data[0].time,
            })
        })
        API.GetCategory().then(res => {
          this.setState({
              category: res.data,
              loading: false
          })
      })
  }
  render() {
  //const {title,summary,body,image,date,time,created,category_id,user,user_id,url} = this.state;
  const ListCategory= this.state.category.map((b, i) => (
    <option value={b.id} key={i}>{b.name}</option>      
  ))
  return (
    <Layout admin>
            <Head>
                <title>Edit Blog - {siteTitle}</title>
            </Head>
    <Container fluid>
                    
                { this.state.loading ?
                <>
                         <Skeleton count={4} height={40} className="mb-1" />
                         <Skeleton width={100} height={40} />
                        </>
                        :
                        <>
                      
                        <Breadcrumb className="my-3">
                        <Link href="/admin" passHref><Breadcrumb.Item >Home</Breadcrumb.Item></Link>
                        <Link href="/admin/blog" passHref><Breadcrumb.Item >Daftar Blog</Breadcrumb.Item></Link>
                        <Breadcrumb.Item active>Tambah</Breadcrumb.Item>
                        </Breadcrumb>
                        
                        <Card className="mb-2" body>
                            <h5 className="mb-3" style={{fontWeight: '400'}}>Tambah Blog</h5>
                            <Formik
                            initialValues={{ 
                                id: this.state.id,
                                title: this.state.title,
                                summary: this.state.summary,
                                body: this.state.body,
                                date: this.state.date,
                                time: this.state.time
                            }}
                            onSubmit={(values, actions) => {
                                alert(JSON.stringify(values));
                                
                                    API.PutBlog(values).then(res=>{
                                      //console.log(res)
                                      if (res.status === 1 ) {
                                        toast.success("Data berhasil disimpan", {position: "top-center"}); 
                                      } 
                                      
                                  }).catch(err => {
                                      console.log(err.response)
                                      toast.warn("Tidak ada data yang diubah", {position: "top-center"}); 
                                  })
                                
                                setTimeout(() => {
                                actions.setSubmitting(false);
                                }, 1000);
                            }}
                            validationSchema={validationSchema}
                            enableReinitialize={true}
                            >
                            {({
                                handleSubmit,
                                handleChange,
                                handleBlur,
                                setFieldValue,
                                values,
                                touched,
                                errors,
                                isSubmitting
                            }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                             
                            <Form.Group>
                                <Form.Label>Judul Blog</Form.Label>
                                <Form.Control name="title" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.title} isInvalid={!!errors.title && touched.title} />
                                {errors.title && touched.title && <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Kategori</Form.Label>
                                <Form.Control className="form-control" value={this.state.category_id} disabled />
                            </Form.Group>

                            <Form.Group>
                            <Row>
                            <Col>
                                <Form.Label>Tanggal</Form.Label>
                                <Form.Control type="date" name="date" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.date} isInvalid={!!errors.date && touched.date} />
                                {errors.date && touched.date && <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>}
                            </Col>
                            <Col>
                            <Form.Label>Jam</Form.Label>
                                <Form.Control type="time" name="time" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.time} isInvalid={!!errors.time && touched.time} />
                                {errors.time && touched.time && <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>}
                            </Col>
                            </Row>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Ringkasan</Form.Label>
                                <Form.Control as="textarea" id="edit" rows="2" name="summary" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.summary} isInvalid={!!errors.summary && touched.summary} />
                                {errors.summary && touched.summary && <Form.Control.Feedback type="invalid">{errors.summary}</Form.Control.Feedback>}
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Isi Blog</Form.Label>
                                <Form.Control as="textarea" id="edit" rows="6" name="body" placeholder="" className="form-control" onChange={handleChange} onBlur={handleBlur} value={values.body} isInvalid={!!errors.body && touched.body} />
                                {errors.body && touched.body && <Form.Control.Feedback type="invalid">{errors.body}</Form.Control.Feedback>}
                            </Form.Group>
                           
                            <Button variant="primary" type="submit" disabled={isSubmitting}>{isSubmitting ? (
                            <>
                            <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            /> Memuat...
                            </>
                            ) : ( <><FaSave/> Simpan</> )}</Button>
       
                     </Form>
                     )}
                    </Formik>

                        </Card>
                       
                        </>
                }
                    
                   
                </Container>
            </Layout>
  );
}
}


export default Edit;