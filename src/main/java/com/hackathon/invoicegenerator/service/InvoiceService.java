package com.hackathon.invoicegenerator.service;

import com.hackathon.invoicegenerator.entity.Invoice;
import com.hackathon.invoicegenerator.entity.InvoiceItem;
import com.hackathon.invoicegenerator.model.InvoiceItemDTO;
import com.hackathon.invoicegenerator.model.InvoiceRequest;
import com.hackathon.invoicegenerator.repository.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InvoiceService {

    private final InvoiceRepository invoiceRepository;

    @Autowired
    public InvoiceService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public Invoice saveInvoice(InvoiceRequest request) {
        // Convert DTOs to entities
        List<InvoiceItem> itemEntities = request.getItems().stream()
                .map(this::convertToEntity)
                .collect(Collectors.toList());

        // Create invoice entity
        Invoice invoice = new Invoice();
        invoice.setUsername(request.getUsername());
        invoice.setEmail(request.getEmail());
        invoice.setItems(itemEntities);  // also sets invoice reference in each item

        // Save to DB
        return invoiceRepository.save(invoice);
    }

    private InvoiceItem convertToEntity(InvoiceItemDTO dto) {
        return new InvoiceItem(dto.getItem(), dto.getQuantity(), dto.getUnitPrice(), dto.getDiscount());
    }

    public Optional<Invoice> getInvoiceById(Long invoiceId) {
        return invoiceRepository.findById(invoiceId);
    }
}
